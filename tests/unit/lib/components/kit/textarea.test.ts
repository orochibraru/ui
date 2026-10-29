import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import Textarea from "#lib/components/kit/textarea.svelte";

describe("Textarea", () => {
	afterEach(() => cleanup());

	test("labels the field and points it at its description", () => {
		const { getByLabelText, getByText } = render(Textarea, {
			label: "Bio",
			name: "bio",
			rows: 4,
			required: true,
			description: "Shown on your profile.",
		});
		const textarea = getByLabelText(/Bio/) as HTMLTextAreaElement;
		expect(textarea.name).toBe("bio");
		expect(textarea.getAttribute("rows")).toBe("4");
		expect(textarea.required).toBe(true);
		expect(textarea.getAttribute("aria-describedby")).toBe(
			getByText("Shown on your profile.").id,
		);
		expect(textarea.hasAttribute("aria-invalid")).toBe(false);
	});

	test("shows the error instead of the description and marks the field invalid", () => {
		const { getByLabelText, getByText, queryByText } = render(Textarea, {
			label: "Feedback",
			description: "Optional.",
			error: "Tell us a little more.",
		});
		const textarea = getByLabelText("Feedback");
		expect(textarea.getAttribute("aria-invalid")).toBe("true");
		expect(textarea.getAttribute("aria-describedby")).toBe(
			getByText("Tell us a little more.").closest("[id]")?.id ?? "",
		);
		expect(queryByText("Optional.") === null).toBe(true);
	});

	test("binds the typed value and posts it under its name", async () => {
		const form = document.createElement("form");
		document.body.append(form);
		const { getByLabelText } = render(Textarea, {
			target: form,
			props: { label: "Notes", name: "notes", value: "First" },
		});
		const textarea = getByLabelText("Notes") as HTMLTextAreaElement;
		expect(textarea.value).toBe("First");
		await fireEvent.input(textarea, { target: { value: "Second" } });
		expect(new FormData(form).get("notes")).toBe("Second");
		form.remove();
	});

	test("with a maxlength, a live counter joins the description", async () => {
		const { getByLabelText, getByText } = render(Textarea, {
			label: "Bio",
			maxlength: 10,
			description: "Short.",
			value: "Hey",
			messages: { characters: "caractères" },
		});
		const textarea = getByLabelText("Bio") as HTMLTextAreaElement;
		expect(textarea.maxLength).toBe(10);
		const counter = getByText("3/10");
		expect(counter.textContent).toContain("caractères");
		expect(textarea.getAttribute("aria-describedby")).toBe(
			`${getByText("Short.").id} ${counter.id}`,
		);
		await fireEvent.input(textarea, { target: { value: "Hello you!" } });
		expect(getByText("10/10").className).toContain("text-destructive");
	});

	test("without a maxlength, there is no counter", () => {
		const { getByLabelText } = render(Textarea, { label: "Notes" });
		expect(getByLabelText("Notes").hasAttribute("aria-describedby")).toBe(
			false,
		);
	});
});
