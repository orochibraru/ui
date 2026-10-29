import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";
import type { Component } from "svelte";

import Input from "#lib/components/kit/input.svelte";

import WithTooltips from "../../../fixtures/with-tooltips.svelte";

function renderInput(props: Record<string, unknown>) {
	return render(WithTooltips, {
		component: Input as unknown as Component<Record<string, unknown>>,
		innerProps: props,
	});
}

describe("Input", () => {
	afterEach(() => cleanup());

	test("labels the field and points it at its description", () => {
		const { getByLabelText, getByText } = renderInput({
			label: "Email",
			name: "email",
			type: "email",
			description: "We send the sign-in link here.",
			required: true,
		});
		const input = getByLabelText(/Email/) as HTMLInputElement;
		expect(input.name).toBe("email");
		expect(input.type).toBe("email");
		expect(input.required).toBe(true);
		const description = getByText("We send the sign-in link here.");
		expect(input.getAttribute("aria-describedby")).toBe(description.id);
		expect(input.hasAttribute("aria-invalid")).toBe(false);
	});

	test("shows the error instead of the description and marks the field invalid", () => {
		const { getByLabelText, getByText, queryByText } = renderInput({
			label: "Project name",
			description: "Shown to your team.",
			error: ["This name is taken."],
		});
		const input = getByLabelText("Project name");
		expect(input.getAttribute("aria-invalid")).toBe("true");
		expect(input.getAttribute("aria-describedby")).toBe(
			getByText("This name is taken.").closest("[id]")?.id ?? "",
		);
		expect(queryByText("Shown to your team.") === null).toBe(true);
	});

	test("binds the typed value", async () => {
		const { getByLabelText } = renderInput({ label: "Name", value: "Alex" });
		const input = getByLabelText("Name") as HTMLInputElement;
		expect(input.value).toBe("Alex");
		await fireEvent.input(input, { target: { value: "Sam" } });
		expect(input.value).toBe("Sam");
	});

	test("a password gets a reveal button", async () => {
		const { getByLabelText, getByRole } = renderInput({
			label: "Password",
			name: "password",
			type: "password",
		});
		const input = getByLabelText("Password") as HTMLInputElement;
		expect(input.type).toBe("password");
		await fireEvent.click(getByRole("button", { name: "Show password" }));
		expect(input.type).toBe("text");
	});
});
