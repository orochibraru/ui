import {
	context,
	diag,
	DiagLogLevel,
	type Span,
	SpanStatusCode,
	trace,
} from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import {
	defaultResource,
	resourceFromAttributes,
} from "@opentelemetry/resources";
import { BatchSpanProcessor, TracerProvider } from "@opentelemetry/sdk-trace";

import { Logger } from "./logger.js";

export interface TelemetryOptions {
	serviceName: string;
	serviceVersion?: string;
	/** The OTLP base URL, like `http://collector:4318`; tracing stays off without one. */
	endpoint?: string;
	resourceAttributes?: Record<string, string>;
}

const logger = new Logger("Telemetry");

/**
 * OpenTelemetry tracing over OTLP for a SvelteKit server: start it from `instrumentation.server.ts` and turn on
 * `tracing: { server: true }` in the kit options, and SvelteKit's own spans for handle, load and actions are exported
 * with the app's.
 */
export class Telemetry {
	readonly #options: TelemetryOptions;
	#provider: TracerProvider | undefined;

	constructor(options: TelemetryOptions) {
		this.#options = options;
	}

	/** Registers the global tracer provider; logs and does nothing without an endpoint. Returns whether tracing is on. */
	start(): boolean {
		const { endpoint, serviceName, serviceVersion, resourceAttributes } =
			this.#options;
		if (!endpoint) {
			logger.info("Tracing off: no OTLP endpoint", { serviceName });
			return false;
		}
		const forward = (message: string, ...args: unknown[]) =>
			logger.warn(message, ...args);
		diag.setLogger(
			{
				error: forward,
				warn: forward,
				info: forward,
				debug: forward,
				verbose: forward,
			},
			DiagLogLevel.WARN,
		);
		context.setGlobalContextManager(
			new AsyncLocalStorageContextManager().enable(),
		);
		this.#provider = new TracerProvider({
			resource: defaultResource().merge(
				resourceFromAttributes({
					...resourceAttributes,
					"service.name": serviceName,
					...(serviceVersion && { "service.version": serviceVersion }),
				}),
			),
			spanProcessors: [
				new BatchSpanProcessor({
					exporter: new OTLPTraceExporter({
						url: `${endpoint.replace(/\/+$/, "")}/v1/traces`,
					}),
				}),
			],
		});
		trace.setGlobalTracerProvider(this.#provider);
		logger.info("Tracing on", { endpoint, serviceName });
		return true;
	}

	/** Runs `work` inside a span named `name`, marking the span failed and rethrowing when `work` throws. */
	withSpan<Result>(
		name: string,
		attributes: Record<string, string | number | boolean>,
		work: (span: Span) => Promise<Result>,
	): Promise<Result> {
		return trace
			.getTracer(this.#options.serviceName)
			.startActiveSpan(name, { attributes }, async (span) => {
				try {
					return await work(span);
				} catch (error) {
					span.recordException(error instanceof Error ? error : String(error));
					span.setStatus({
						code: SpanStatusCode.ERROR,
						message: error instanceof Error ? error.message : String(error),
					});
					throw error;
				} finally {
					span.end();
				}
			});
	}

	/** Exports the pending spans and stops tracing; never throws, for a shutdown hook. */
	async flush(): Promise<void> {
		await this.#provider?.shutdown().catch(() => {});
		trace.disable();
		context.disable();
		diag.disable();
		this.#provider = undefined;
	}
}
