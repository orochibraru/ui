import { error, redirect } from "@sveltejs/kit";

import { isGroup, shadcnHref } from "../../docs/registry.js";

export function load({ params }) {
	if (params.group === "primitives") {
		redirect(308, shadcnHref(), { external: true });
	}
	if (!isGroup(params.group)) {
		error(404, "Not found");
	}
	return { group: params.group };
}
