import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import Switch from "#lib/components/kit/switch.svelte";

import { Bound } from "../../../fixtures/bound.svelte.ts";

function renderInForm(props: Record<string, unknown>) {
	const form = document.body.appendChild(document.createElement("form"));
	return { form, ...render(Switch, { target: form, props }) };
}

describe("Switch", () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = "";
	});

	test("labels the switch and points it at its description", () => {
		const { getByRole, getByText } = renderInForm({
			id: "mentions",
			label: "Mentions",
			description: "When someone mentions me.",
		});
		const toggle = getByRole("switch", { name: "Mentions" });
		expect(toggle.getAttribute("aria-describedby")).toBe(
			"mentions-description",
		);
		expect(getByText("When someone mentions me.").id).toBe(
			"mentions-description",
		);
	});

	test("shows the error and marks the switch invalid", () => {
		const { getByRole, getByText } = renderInForm({
			id: "mentions",
			label: "Mentions",
			error: "Turn this on to continue.",
		});
		const toggle = getByRole("switch", { name: "Mentions" });
		expect(toggle.getAttribute("aria-invalid")).toBe("true");
		expect(toggle.getAttribute("aria-describedby")).toBe("mentions-error");
		expect(getByText("Turn this on to continue.").id).toBe("mentions-error");
	});

	test("binds checked and posts name=true only when on", async () => {
		const checked = new Bound<boolean>(false);
		const { form, getByRole, getByText } = renderInForm({
			name: "mentions",
			label: "Mentions",
			get checked() {
				return checked.current;
			},
			set checked(next: boolean) {
				checked.current = next;
			},
		});
		expect(new FormData(form).get("mentions")).toBeNull();
		await fireEvent.click(getByRole("switch", { name: "Mentions" }));
		expect(checked.current).toBe(true);
		expect(new FormData(form).get("mentions")).toBe("true");
		await fireEvent.click(getByText("Mentions"));
		expect(checked.current).toBe(false);
		expect(new FormData(form).get("mentions")).toBeNull();
	});

	test("does not toggle or post when disabled", async () => {
		const { form, getByRole } = renderInForm({
			name: "mentions",
			label: "Mentions",
			checked: true,
			disabled: true,
		});
		const toggle = getByRole("switch", { name: "Mentions" });
		await fireEvent.click(toggle);
		expect(toggle.getAttribute("aria-checked")).toBe("true");
		expect(new FormData(form).get("mentions")).toBeNull();
	});
});
