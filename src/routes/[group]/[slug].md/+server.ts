import { error } from "@sveltejs/kit";

import { isGroup } from "../../../docs/catalog.js";
import { docMarkdown, findBySlug } from "../../../docs/content.js";
import { content } from "../../../docs/sources.server.js";

export function GET({ params }) {
	const found = findBySlug(params.slug);
	if (!isGroup(params.group) || found?.group !== params.group) {
		error(404, "Not found");
	}
	return new Response(docMarkdown(content, found), {
		headers: { "content-type": "text/markdown; charset=utf-8" },
	});
}
