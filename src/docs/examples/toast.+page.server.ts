import { type Actions, fail } from "@sveltejs/kit";

export const actions = {
	save: async ({ request }) => {
		const form = await request.formData();
		if (!String(form.get("name") ?? "").trim()) {
			return fail(400, { error: "Name is required." });
		}
		return { saved: true };
	},
} satisfies Actions;
