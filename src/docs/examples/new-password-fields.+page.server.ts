import { type Actions, fail } from "@sveltejs/kit";

import { passwordRules } from "#lib/password.js";

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const password = String(form.get("password") ?? "");
		const failed = passwordRules(
			password,
			String(form.get("email") ?? ""),
		).filter((rule) => !rule.passed);
		if (failed.length > 0) {
			return fail(400, {
				errors: { password: failed.map((rule) => rule.label) },
			});
		}
		if (form.get("confirmPassword") !== password) {
			return fail(400, {
				errors: { confirmPassword: ["The passwords don't match."] },
			});
		}
		return { saved: true };
	},
} satisfies Actions;
