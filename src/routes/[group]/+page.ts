import { error } from "@sveltejs/kit";

import { isGroup } from "../../docs/registry.js";

export function load({ params }) {
	if (!isGroup(params.group)) {
		error(404, "Not found");
	}
	return { group: params.group };
}
