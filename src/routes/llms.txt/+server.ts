import { llmsIndex } from "../../docs/llms.js";

export function GET({ url }) {
	return new Response(llmsIndex(url.origin), {
		headers: { "content-type": "text/plain; charset=utf-8" },
	});
}
