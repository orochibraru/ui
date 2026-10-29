import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import RadioList from "#lib/components/kit/radio-list.svelte";

import { Bound } from "../../../fixtures/bound.svelte.ts";

const options = [
	{ value: "private", label: "Private", description: "Only you." },
	{ value: "team", label: "Team" },
	{ value: "public", label: "Public", disabled: true },
];

function renderInForm(props: Record<string, unknown>) {
	const form = document.body.appendChild(document.createElement("form"));
	const withOptions = Object.defineProperties(
		{ options },
		Object.getOwnPropertyDescriptors(props),
	);
	return {
		form,
		...render(RadioList, { target: form, props: withOptions }),
	};
}

describe("RadioList", () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = "";
	});

	test("renders a fieldset and a radio group named by the legend", () => {
		const { getByRole } = renderInForm({
			id: "visibility",
			label: "Visibility",
			description: "You can change this later.",
		});
		const fieldset = getByRole("group", { name: "Visibility" });
		expect(fieldset.tagName).toBe("FIELDSET");
		expect(fieldset.getAttribute("aria-describedby")).toBe(
			"visibility-description",
		);
		expect(getByRole("radiogroup", { name: "Visibility" })).toBeTruthy();
		expect(
			getByRole("radio", { name: "Private" }).getAttribute("aria-describedby"),
		).toBe("visibility-0-description");
	});

	test("shows the error and marks the group invalid", () => {
		const { getByRole, getByText } = renderInForm({
			id: "visibility",
			label: "Visibility",
			error: ["Pick one."],
		});
		expect(
			getByRole("group", { name: "Visibility" }).getAttribute(
				"aria-describedby",
			),
		).toBe("visibility-error");
		expect(
			getByRole("radiogroup", { name: "Visibility" }).getAttribute(
				"aria-invalid",
			),
		).toBe("true");
		expect(getByText("Pick one.").id).toBe("visibility-error");
	});

	for (const variant of ["list", "cards"]) {
		test(`binds the value and posts it (${variant})`, async () => {
			const value = new Bound<string>("private");
			const { form, getByRole } = renderInForm({
				name: "visibility",
				label: "Visibility",
				variant,
				get value() {
					return value.current;
				},
				set value(next: string) {
					value.current = next;
				},
			});
			expect(new FormData(form).get("visibility")).toBe("private");
			await fireEvent.click(getByRole("radio", { name: "Team" }));
			expect(value.current).toBe("team");
			expect(new FormData(form).get("visibility")).toBe("team");
			expect(
				getByRole("radio", { name: "Team" }).getAttribute("aria-checked"),
			).toBe("true");
		});
	}

	test("ignores disabled options", async () => {
		const { form, getByRole } = renderInForm({
			name: "visibility",
			label: "Visibility",
			value: "team",
		});
		const publicOption = getByRole("radio", { name: "Public" });
		expect(publicOption.hasAttribute("disabled")).toBe(true);
		await fireEvent.click(publicOption);
		expect(new FormData(form).get("visibility")).toBe("team");
	});

	test("disables the whole list", () => {
		const { form, getAllByRole } = renderInForm({
			name: "visibility",
			label: "Visibility",
			value: "team",
			disabled: true,
		});
		for (const radio of getAllByRole("radio")) {
			expect(radio.hasAttribute("disabled")).toBe(true);
		}
		expect(new FormData(form).get("visibility")).toBeNull();
	});
});
