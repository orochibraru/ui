import { Telemetry } from "#lib/server/telemetry.js";

new Telemetry({
	serviceName: "acme",
	serviceVersion: process.env.APP_VERSION,
	endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
}).start();
