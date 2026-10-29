import { llmsFull } from "../../docs/content.js";
import { content } from "../../docs/sources.server.js";

export function GET() {
	return new Response(llmsFull(content), {
		headers: { "content-type": "text/plain; charset=utf-8" },
	});
}
