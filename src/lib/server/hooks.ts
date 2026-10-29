import { SpanStatusCode, trace } from "@opentelemetry/api";
import type { Handle, HandleServerError } from "@sveltejs/kit/hooks";

import type { Logger } from "./logger.js";

const defaultQuietPaths = [
	"/_app/",
	"/.well-known/",
	"/api/health",
	"/favicon",
	"/sw.js",
	"/workbox-",
];

/** A `handle` writing one log line per request, skipping assets, data requests and the paths in `quietPaths`. */
export function requestLog(
	logger: Logger,
	quietPaths: string[] = defaultQuietPaths,
): Handle {
	return async ({ event, resolve }) => {
		const startedAt = performance.now();
		const response = await resolve(event);
		const path = event.url.pathname;
		if (
			!path.endsWith("/__data.json") &&
			!quietPaths.some((quiet) => path.startsWith(quiet))
		) {
			logger.request({
				method: event.request.method,
				path,
				status: response.status,
				durationMs: Math.round(performance.now() - startedAt),
			});
		}
		return response;
	};
}

/**
 * A `handleError` for unexpected errors: logs them, records them on the request's span, and returns an `errorId`
 * (the trace id when tracing is on) that the error page shows, so a user's report leads to the trace.
 */
export function unexpectedErrors(
	logger: Logger,
	message = "Something went wrong.",
): HandleServerError {
	return ({ error, event }) => {
		const span = trace.getActiveSpan();
		span?.recordException(error instanceof Error ? error : String(error));
		span?.setStatus({ code: SpanStatusCode.ERROR });
		const errorId = span?.spanContext().traceId ?? crypto.randomUUID();
		logger.error(
			"Unhandled error",
			{ errorId, method: event.request.method, path: event.url.pathname },
			error,
		);
		return { errorId, message };
	};
}
