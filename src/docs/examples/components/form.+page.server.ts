import { type Actions, fail } from "@sveltejs/kit";

export const actions = {
	createProject: async ({ request }) => {
		const form = await request.formData();
		const name = String(form.get("name") ?? "").trim();
		const owner = String(form.get("owner") ?? "").trim();
		const errors: Record<string, string[]> = {};
		if (!name) {
			errors.name = ["Give the project a name."];
		}
		if (owner && !owner.includes("@")) {
			errors.owner = ["That doesn't look like an email address."];
		}
		if (Object.keys(errors).length > 0) {
			return fail(400, { errors });
		}
		return { created: name };
	},
} satisfies Actions;
