import { error } from "@sveltejs/kit";

import { actions as formActions } from "../../../../docs/examples/components/form.+page.server.js";
import { actions as toastActions } from "../../../../docs/examples/toast.+page.server.js";
import { findDoc, isGroup } from "../../../../docs/registry.js";

export const actions = { ...toastActions, ...formActions };

export async function load({ params, url }) {
	if (url.searchParams.has("slow")) {
		await new Promise((done) => setTimeout(done, 1500));
	}
	if (!isGroup(params.group) || !findDoc(params.group, params.slug)) {
		error(404, "Not found");
	}
	return {
		group: params.group,
		slug: params.slug,
	};
}
