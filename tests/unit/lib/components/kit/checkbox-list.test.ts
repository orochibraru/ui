import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import CheckboxList from "#lib/components/kit/checkbox-list.svelte";

import { Bound } from "../../../fixtures/bound.svelte.ts";

const options = [
	{ value: "email", label: "Email", description: "To your address." },
	{ value: "push", label: "Push" },
	{ value: "sms", label: "Text message", disabled: true },
];

function renderInForm(props: Record<string, unknown>) {
	const form = document.body.appendChild(document.createElement("form"));
	const withOptions = Object.defineProperties(
		{ options },
		Object.getOwnPropertyDescriptors(props),
	);
	return {
		form,
		...render(CheckboxList, { target: form, props: withOptions }),
	};
}

describe("CheckboxList", () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = "";
	});

	test("renders a fieldset named by its legend and described by its description", () => {
		const { getByRole } = renderInForm({
			id: "channels",
			label: "Notify me by",
			description: "Pick as many as you like.",
		});
		const group = getByRole("group", { name: "Notify me by" });
		expect(group.tagName).toBe("FIELDSET");
		expect(group.getAttribute("aria-describedby")).toBe("channels-description");
		const email = getByRole("checkbox", { name: "Email" });
		expect(email.getAttribute("aria-describedby")).toBe(
			"channels-0-description",
		);
		expect(getByRole("checkbox", { name: "Push" })).toBeTruthy();
	});

	test("shows the error and marks every box invalid", () => {
		const { getByRole, getByText, getAllByRole } = renderInForm({
			id: "channels",
			label: "Notify me by",
			description: "Pick as many as you like.",
			error: "Pick at least one.",
		});
		expect(
			getByRole("group", { name: "Notify me by" }).getAttribute(
				"aria-describedby",
			),
		).toBe("channels-error");
		expect(getByText("Pick at least one.").id).toBe("channels-error");
		for (const checkbox of getAllByRole("checkbox")) {
			expect(checkbox.getAttribute("aria-invalid")).toBe("true");
		}
	});

	test("binds the checked values and posts one entry per value", async () => {
		const value = new Bound<string[]>(["push"]);
		const { form, getByRole } = renderInForm({
			name: "channels",
			label: "Notify me by",
			get value() {
				return value.current;
			},
			set value(next: string[]) {
				value.current = next;
			},
		});
		expect(new FormData(form).getAll("channels")).toEqual(["push"]);
		await fireEvent.click(getByRole("checkbox", { name: "Email" }));
		expect(value.current).toEqual(["push", "email"]);
		expect(new FormData(form).getAll("channels")).toEqual(["email", "push"]);
		await fireEvent.click(getByRole("checkbox", { name: "Push" }));
		expect(value.current).toEqual(["email"]);
		expect(new FormData(form).getAll("channels")).toEqual(["email"]);
	});

	test("keeps disabled options out of reach and out of the form", async () => {
		const { form, getByRole } = renderInForm({
			name: "channels",
			label: "Notify me by",
			value: ["sms"],
		});
		const sms = getByRole("checkbox", { name: "Text message" });
		expect(sms.hasAttribute("disabled")).toBe(true);
		await fireEvent.click(sms);
		expect(sms.getAttribute("aria-checked")).toBe("true");
		expect(new FormData(form).getAll("channels")).toEqual([]);
	});

	test("disables the whole list", () => {
		const { form, getAllByRole } = renderInForm({
			name: "channels",
			label: "Notify me by",
			value: ["email"],
			disabled: true,
		});
		for (const checkbox of getAllByRole("checkbox")) {
			expect(checkbox.hasAttribute("disabled")).toBe(true);
		}
		expect(new FormData(form).getAll("channels")).toEqual([]);
	});
});
