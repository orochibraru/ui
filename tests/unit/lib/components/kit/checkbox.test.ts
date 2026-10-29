import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import Checkbox from "#lib/components/kit/checkbox.svelte";

import { Bound } from "../../../fixtures/bound.svelte.ts";

function renderInForm(props: Record<string, unknown>) {
	const form = document.body.appendChild(document.createElement("form"));
	return { form, ...render(Checkbox, { target: form, props }) };
}

describe("Checkbox", () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = "";
	});

	test("labels the box and points it at its description", () => {
		const { getByRole, getByText } = renderInForm({
			id: "digest",
			label: "Weekly digest",
			description: "Every Monday.",
			required: true,
		});
		const checkbox = getByRole("checkbox", { name: "Weekly digest" });
		expect(checkbox.getAttribute("aria-describedby")).toBe(
			"digest-description",
		);
		expect(checkbox.getAttribute("aria-invalid")).toBeNull();
		expect(getByText("Every Monday.").id).toBe("digest-description");
	});

	test("shows the error instead of the description and marks the box invalid", () => {
		const { getByRole, getByText, queryByText } = renderInForm({
			id: "terms",
			label: "I accept the terms",
			description: "Read them first.",
			error: ["Accept the terms.", "Really."],
		});
		const checkbox = getByRole("checkbox", { name: "I accept the terms" });
		expect(checkbox.getAttribute("aria-invalid")).toBe("true");
		expect(checkbox.getAttribute("aria-describedby")).toBe("terms-error");
		expect(getByText("Accept the terms.")).toBeTruthy();
		expect(getByText("Really.")).toBeTruthy();
		expect(queryByText("Read them first.")).toBeNull();
	});

	test("binds checked and posts name=on only when checked", async () => {
		const checked = new Bound<boolean>(false);
		const { form, getByRole, getByText } = renderInForm({
			name: "digest",
			label: "Weekly digest",
			get checked() {
				return checked.current;
			},
			set checked(next: boolean) {
				checked.current = next;
			},
		});
		expect(new FormData(form).get("digest")).toBeNull();
		await fireEvent.click(getByRole("checkbox", { name: "Weekly digest" }));
		expect(checked.current).toBe(true);
		expect(new FormData(form).get("digest")).toBe("on");
		await fireEvent.click(getByText("Weekly digest"));
		expect(checked.current).toBe(false);
	});

	test("does not toggle or post when disabled", async () => {
		const { form, getByRole } = renderInForm({
			name: "digest",
			label: "Weekly digest",
			checked: true,
			disabled: true,
		});
		const checkbox = getByRole("checkbox", { name: "Weekly digest" });
		await fireEvent.click(checkbox);
		expect(checkbox.getAttribute("aria-checked")).toBe("true");
		expect(new FormData(form).get("digest")).toBeNull();
	});
});
