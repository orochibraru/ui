import { afterEach, describe, expect, test } from "bun:test";

import EyeIcon from "@lucide/svelte/icons/eye";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

import SegmentedControl from "#lib/components/kit/segmented-control.svelte";

import { Bound } from "../../../fixtures/bound.svelte.ts";

const options = [
	{ value: "viewer", label: "Viewer", icon: EyeIcon },
	{ value: "editor", label: "Editor" },
	{ value: "admin", label: "Admin" },
];

function renderInForm(props: Record<string, unknown>) {
	const form = document.body.appendChild(document.createElement("form"));
	const withOptions = Object.defineProperties(
		{ options },
		Object.getOwnPropertyDescriptors(props),
	);
	return {
		form,
		...render(SegmentedControl, { target: form, props: withOptions }),
	};
}

describe("SegmentedControl", () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = "";
	});

	test("renders a fieldset named by the legend with one radio per option", () => {
		const { getAllByRole, getByRole, getByText } = renderInForm({
			id: "role",
			label: "Role",
			description: "Admins can invite members.",
			required: true,
		});
		const fieldset = getAllByRole("group", { name: /Role/ })[0];
		expect(fieldset?.tagName).toBe("FIELDSET");
		expect(fieldset?.getAttribute("aria-describedby")).toBe("role-description");
		expect(getByText("Admins can invite members.").id).toBe("role-description");
		expect(getByRole("radio", { name: "Viewer" })).toBeTruthy();
		expect(getAllByRole("radio")).toHaveLength(3);
	});

	test("shows the error and points the fieldset at it", () => {
		const { container, getByText } = renderInForm({
			id: "role",
			label: "Role",
			error: "Pick a role.",
		});
		expect(
			container.querySelector("fieldset")?.getAttribute("aria-describedby"),
		).toBe("role-error");
		expect(getByText("Pick a role.").id).toBe("role-error");
	});

	test("binds the value, posts it and never clears it", async () => {
		const value = new Bound<string>("editor");
		const { form, getByRole } = renderInForm({
			name: "role",
			label: "Role",
			get value() {
				return value.current;
			},
			set value(next: string) {
				value.current = next;
			},
		});
		expect(new FormData(form).get("role")).toBe("editor");
		await fireEvent.click(getByRole("radio", { name: "Admin" }));
		expect(value.current).toBe("admin");
		expect(new FormData(form).get("role")).toBe("admin");
		await fireEvent.click(getByRole("radio", { name: "Admin" }));
		expect(value.current).toBe("admin");
		expect(
			getByRole("radio", { name: "Admin" }).getAttribute("aria-checked"),
		).toBe("true");
	});

	test("does not change or post when disabled", async () => {
		const { form, getByRole } = renderInForm({
			name: "role",
			label: "Role",
			value: "editor",
			disabled: true,
		});
		await fireEvent.click(getByRole("radio", { name: "Admin" }));
		expect(
			getByRole("radio", { name: "Editor" }).getAttribute("aria-checked"),
		).toBe("true");
		expect(new FormData(form).get("role")).toBeNull();
	});
});
