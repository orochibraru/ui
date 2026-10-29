import { error } from "@sveltejs/kit";

import { highlight, langOf } from "../../../docs/highlight.server.js";
import { findDoc, isGroup } from "../../../docs/registry.js";
import { sourcesOf } from "../../../docs/sources.server.js";

export { actions } from "../../../docs/examples/toast.+page.server.js";

export async function load({ params }) {
	if (!isGroup(params.group) || !findDoc(params.group, params.slug)) {
		error(404, "Not found");
	}
	return {
		group: params.group,
		slug: params.slug,
		sources: await Promise.all(
			sourcesOf(params.slug).map(async (file) => ({
				...file,
				html: await highlight(file.code, langOf(file.name)),
			})),
		),
	};
}
