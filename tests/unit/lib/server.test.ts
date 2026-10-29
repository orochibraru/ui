import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	spyOn,
	test,
} from "bun:test";

import { context, SpanStatusCode, trace } from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
	InMemorySpanExporter,
	SimpleSpanProcessor,
	TracerProvider,
} from "@opentelemetry/sdk-trace";

import { requestLog, unexpectedErrors } from "#lib/server/hooks.js";
import { configureLogging, Logger } from "#lib/server/logger.js";
import { Telemetry } from "#lib/server/telemetry.js";

const exporter = new InMemorySpanExporter();
const provider = new TracerProvider({
	spanProcessors: [new SimpleSpanProcessor({ exporter })],
});

beforeAll(() => {
	context.setGlobalContextManager(
		new AsyncLocalStorageContextManager().enable(),
	);
	trace.setGlobalTracerProvider(provider);
});

afterAll(() => {
	trace.disable();
	context.disable();
});

function captureOutput() {
	const out = spyOn(console, "log").mockImplementation(() => {});
	const err = spyOn(console, "error").mockImplementation(() => {});
	return {
		lines: () =>
			[...out.mock.calls, ...err.mock.calls].map((call) =>
				JSON.parse(String(call[0])),
			),
		restore: () => {
			out.mockRestore();
			err.mockRestore();
		},
	};
}

describe("Logger", () => {
	let output: ReturnType<typeof captureOutput>;

	afterEach(() => {
		output.restore();
		exporter.reset();
	});

	test("drops lines under the configured level", () => {
		configureLogging({ level: "warn", format: "json" });
		output = captureOutput();
		const logger = new Logger("Test");
		logger.info("hidden");
		logger.warn("shown");
		expect(output.lines().map((line) => line.message)).toEqual(["shown"]);
	});

	test("writes JSON with merged fields, a serialised error and the active trace", async () => {
		configureLogging({ level: "trace", format: "json" });
		output = captureOutput();
		const logger = new Logger("Test");
		let traceId = "";
		await trace.getTracer("test").startActiveSpan("work", async (span) => {
			traceId = span.spanContext().traceId;
			logger.error("Failed", { userId: "u1" }, new Error("boom"), 42);
			span.end();
		});
		const [line] = output.lines();
		expect(line).toMatchObject({
			level: "error",
			scope: "Test",
			message: "Failed",
			userId: "u1",
			error: { name: "Error", message: "boom" },
			params: [42],
			trace_id: traceId,
		});
	});

	test("logs a request at error level for a failure, info otherwise", () => {
		configureLogging({ level: "trace", format: "json" });
		output = captureOutput();
		const logger = new Logger("Http");
		logger.request({ method: "GET", path: "/", status: 200, durationMs: 3 });
		logger.request({ method: "GET", path: "/x", status: 404, durationMs: 1 });
		logger.request({ method: "POST", path: "/y", status: 500, durationMs: 9 });
		expect(output.lines().map((line) => line.level)).toEqual([
			"info",
			"info",
			"error",
		]);
	});

	test("folds a banner into one JSON line and skips art", () => {
		configureLogging({ level: "trace", format: "json" });
		output = captureOutput();
		const logger = new Logger("Boot");
		logger.banner("warn", ["Setup needed", "Open /setup"]);
		logger.art("ASCII LOGO");
		expect(output.lines().map((line) => line.message)).toEqual([
			"Setup needed Open /setup",
		]);
	});

	test("writes coloured text in console format", () => {
		configureLogging({ level: "trace", format: "console" });
		const out = spyOn(console, "log").mockImplementation(() => {});
		output = { lines: () => [], restore: () => out.mockRestore() };
		const logger = new Logger("Boot");
		logger.info("Ready", { port: 3000 });
		logger.request({ method: "GET", path: "/", status: 200, durationMs: 2 });
		logger.banner("info", ["Hello"]);
		logger.art("LOGO");
		const printed = out.mock.calls.map((call) => call.join(" ")).join("\n");
		expect(printed).toContain("[Boot]");
		expect(printed).toContain("Ready");
		expect(printed).toContain("#  Hello  #");
		expect(printed).toContain("LOGO");
	});
});

describe("requestLog", () => {
	afterEach(() => configureLogging({ format: "console" }));

	test("logs pages and skips assets and data requests", async () => {
		configureLogging({ level: "trace", format: "json" });
		const output = captureOutput();
		const handle = requestLog(new Logger("Http"));
		const resolve = () => Promise.resolve(new Response("ok", { status: 201 }));
		for (const path of ["/projects", "/_app/x.js", "/projects/__data.json"]) {
			await handle({
				event: {
					url: new URL(`http://localhost${path}`),
					request: new Request(`http://localhost${path}`),
				},
				resolve,
			} as never);
		}
		const lines = output.lines();
		output.restore();
		expect(lines).toHaveLength(1);
		expect(lines[0]).toMatchObject({ path: "/projects", status: 201 });
	});
});

describe("unexpectedErrors", () => {
	test("records the error on the span and returns its trace id", async () => {
		configureLogging({ level: "trace", format: "json" });
		const output = captureOutput();
		const handleError = unexpectedErrors(new Logger("Server"), "Oops.");
		const event = {
			url: new URL("http://localhost/projects"),
			request: new Request("http://localhost/projects"),
		};
		let returned: unknown;
		let traceId = "";
		await trace.getTracer("test").startActiveSpan("request", async (span) => {
			traceId = span.spanContext().traceId;
			returned = await handleError({
				error: new Error("db down"),
				event,
				status: 500,
				message: "Internal Error",
			} as never);
			span.end();
		});
		await provider.forceFlush();
		const span = exporter.getFinishedSpans().at(-1);
		output.restore();
		expect(returned).toEqual({
			errorId: traceId,
			message: "Oops.",
		});
		expect(span?.events.map((spanEvent) => spanEvent.name)).toContain(
			"exception",
		);
		exporter.reset();
	});
});

describe("Telemetry", () => {
	test("stays off without an endpoint", () => {
		const output = captureOutput();
		expect(new Telemetry({ serviceName: "test" }).start()).toBe(false);
		output.restore();
	});

	test("withSpan marks a failed span and rethrows", async () => {
		const telemetry = new Telemetry({ serviceName: "test" });
		await expect(
			telemetry.withSpan("job", { id: 1 }, () =>
				Promise.reject(new Error("nope")),
			),
		).rejects.toThrow("nope");
		expect(await telemetry.withSpan("ok", {}, () => Promise.resolve(5))).toBe(
			5,
		);
		await provider.forceFlush();
		const [failed, passed] = exporter.getFinishedSpans();
		expect(failed?.name).toBe("job");
		expect(failed?.status.code).toBe(SpanStatusCode.ERROR);
		expect(passed?.name).toBe("ok");
		exporter.reset();
	});

	test("start exports to the endpoint's traces path, and flush stops it", async () => {
		const output = captureOutput();
		const telemetry = new Telemetry({
			serviceName: "docs",
			serviceVersion: "1.2.3",
			endpoint: "http://127.0.0.1:4318/",
			resourceAttributes: { "deployment.environment": "test" },
		});
		expect(telemetry.start()).toBe(true);
		expect(trace.getTracerProvider()).not.toBe(provider);
		await telemetry.flush();
		const messages = output.lines().map((line) => line.message);
		output.restore();
		expect(messages).toContain("Tracing on");
	});
});
