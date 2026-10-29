import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { createMcpServer } from "../../docs/mcp-server.js";
import { content } from "../../docs/sources.server.js";

async function handle({ request }: { request: Request }): Promise<Response> {
	const transport = new WebStandardStreamableHTTPServerTransport({
		sessionIdGenerator: undefined,
		enableJsonResponse: true,
	});
	await createMcpServer(content).connect(transport);
	return transport.handleRequest(request);
}

export const GET = handle;
export const POST = handle;
export const DELETE = handle;
