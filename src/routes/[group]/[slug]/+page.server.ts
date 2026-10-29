import { error, redirect } from "@sveltejs/kit";

import { sourcesOf } from "../../../docs/content.js";
import { actions as formActions } from "../../../docs/examples/components/form.+page.server.js";
import { actions as toastActions } from "../../../docs/examples/toast.+page.server.js";
import { highlight, langOf } from "../../../docs/highlight.server.js";
import { findDoc, isGroup, shadcnHref } from "../../../docs/registry.js";
import { content } from "../../../docs/sources.server.js";

export const actions = { ...toastActions, ...formActions };

export async function load({ params, url }) {
	if (url.searchParams.has("slow")) {
		await new Promise((done) => setTimeout(done, 1500));
	}
	if (params.group === "primitives") {
		redirect(308, shadcnHref(params.slug), { external: true });
	}
	if (!isGroup(params.group) || !findDoc(params.group, params.slug)) {
		error(404, "Not found");
	}
	return {
		group: params.group,
		slug: params.slug,
		sources: await Promise.all(
			sourcesOf(content, params.group, params.slug).map(async (file) => ({
				...file,
				html: await highlight(file.code, langOf(file.name)),
			})),
		),
	};
}
