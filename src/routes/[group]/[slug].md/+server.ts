import { error } from "@sveltejs/kit";

import { docMarkdown } from "../../../docs/llms.js";
import { findDoc, isGroup } from "../../../docs/registry.js";

export function GET({ params }) {
	const doc = findDoc(params.group, params.slug);
	if (!isGroup(params.group) || !doc) {
		error(404, "Not found");
	}
	return new Response(docMarkdown({ group: params.group, doc }), {
		headers: { "content-type": "text/markdown; charset=utf-8" },
	});
}
