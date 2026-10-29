import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { Dialog } from "bits-ui";
import { type Component, createRawSnippet, flushSync } from "svelte";

mock.module("vaul-svelte", () => ({
	Drawer: { ...Dialog, NestedRoot: Dialog.Root },
}));
mock.module("svelte-sonner", () => ({
	toast: {
		promise: (tracked: Promise<unknown>) => {
			tracked.catch(() => {});
		},
	},
}));
type Submit = (input: {
	formData: FormData;
}) => (outcome: {
	result: unknown;
	update: (options?: unknown) => Promise<void>;
}) => Promise<void>;

let submit: Submit | undefined;
mock.module("$app/forms", () => ({
	enhance: (_form: HTMLFormElement, given: Submit) => {
		submit = given;
		return { destroy() {} };
	},
}));

const { default: Form, initialValues } =
	await import("#lib/components/kit/form.svelte");
const { default: WithTooltips } =
	await import("../../../fixtures/with-tooltips.svelte");

const fields = [
	{ name: "name", label: "Project name", required: true },
	{ name: "owner", type: "email" as const, label: "Owner" },
	{ name: "notify", type: "switch" as const, label: "Notify the team" },
	{
		name: "tags",
		type: "checkboxes" as const,
		label: "Tags",
		options: [
			{ value: "design", label: "Design" },
			{ value: "web", label: "Web" },
		],
	},
	{ name: "about", type: "textarea" as const, label: "About" },
];

const options = [
	{ value: "one", label: "One" },
	{ value: "two", label: "Two" },
];

const everyType = [
	{ name: "role", type: "select" as const, label: "Role", options },
	{ name: "due", type: "date" as const, label: "Due" },
	{ name: "agree", type: "checkbox" as const, label: "Agree" },
	{ name: "size", type: "radio" as const, label: "Size", options },
	{
		name: "plan",
		type: "radio" as const,
		label: "Plan",
		options,
		variant: "cards" as const,
	},
	{ name: "view", type: "segmented" as const, label: "View", options },
	{ name: "site", type: "url" as const, label: "Site", span: "full" as const },
];

async function settle(result: unknown) {
	const run = submit?.({ formData: new FormData() });
	flushSync();
	await run?.({ result, update: () => Promise.resolve() });
	flushSync();
}

function renderForm(props: Record<string, unknown> = {}) {
	return render(WithTooltips, {
		component: Form as unknown as Component<Record<string, unknown>>,
		innerProps: { fields, ...props },
	});
}

describe("initialValues", () => {
	test("starts every field empty for its type, unless a value is given", () => {
		expect(initialValues(fields, { name: "Website", notify: true })).toEqual({
			name: "Website",
			owner: "",
			notify: true,
			tags: [],
			about: "",
		});
	});
});

describe("Form", () => {
	afterEach(() => cleanup());

	test("renders each field as its component, posting under its name", () => {
		const { container, getByLabelText } = renderForm({
			values: { name: "Website", tags: ["web"] },
			action: "?/createProject",
		});
		const form = container.querySelector("form") as HTMLFormElement;
		expect(form.getAttribute("action")).toBe("?/createProject");
		expect((getByLabelText(/Project name/) as HTMLInputElement).value).toBe(
			"Website",
		);
		expect((getByLabelText("Owner") as HTMLInputElement).type).toBe("email");
		expect(getByLabelText("About").tagName).toBe("TEXTAREA");
		const posted = new FormData(form);
		expect(posted.get("name")).toBe("Website");
		expect(posted.getAll("tags")).toEqual(["web"]);
	});

	test("shows each field's errors under it", () => {
		const { getByLabelText, getByText } = renderForm({
			errors: { name: ["Give the project a name."] },
		});
		expect(getByText("Give the project a name.")).toBeTruthy();
		expect(getByLabelText(/Project name/).getAttribute("aria-invalid")).toBe(
			"true",
		);
		expect(getByLabelText("Owner").hasAttribute("aria-invalid")).toBe(false);
	});

	test("labels the submit button in the app's words", () => {
		const { getByRole } = renderForm({
			messages: { submit: "Create project" },
		});
		expect(
			getByRole("button", { name: "Create project" }).getAttribute("type"),
		).toBe("submit");
	});

	test("renders every field type", () => {
		const { getByText, container } = renderForm({
			fields: everyType,
			values: { role: "two", view: "one" },
			columns: 1,
		});
		for (const label of [
			"Role",
			"Due",
			"Agree",
			"Size",
			"Plan",
			"View",
			"Site",
		]) {
			expect(getByText(label)).toBeTruthy();
		}
		const posted = new FormData(
			container.querySelector("form") as HTMLFormElement,
		);
		expect(posted.get("role")).toBe("two");
		expect(posted.get("view")).toBe("one");
	});

	test("binds what the user types and toggles into values", async () => {
		const bound: { values: Record<string, unknown> } = { values: {} };
		const { getByLabelText, getByText } = render(WithTooltips, {
			component: Form as unknown as Component<Record<string, unknown>>,
			innerProps: {
				fields,
				get values() {
					return bound.values;
				},
				set values(next: Record<string, unknown>) {
					bound.values = next;
				},
			},
		});
		await fireEvent.input(getByLabelText(/Project name/), {
			target: { value: "Website" },
		});
		await fireEvent.input(getByLabelText("About"), {
			target: { value: "A new site." },
		});
		await fireEvent.click(getByText("Notify the team"));
		await fireEvent.click(getByText("Design"));
		flushSync();
		expect(bound.values.name).toBe("Website");
		expect(bound.values.about).toBe("A new site.");
		expect(bound.values.notify).toBe(true);
		expect(bound.values.tags).toEqual(["design"]);
	});

	test("a failed submit puts the action's errors under their fields", async () => {
		const { getByLabelText, getByText } = renderForm();
		await settle({
			type: "failure",
			status: 400,
			data: { errors: { owner: ["That doesn't look like an email."] } },
		});
		expect(getByText("That doesn't look like an email.")).toBeTruthy();
		expect(getByLabelText("Owner").getAttribute("aria-invalid")).toBe("true");
	});

	test("a successful submit clears the errors and calls onsuccess", async () => {
		const onsuccess = mock((_data: unknown) => {});
		const { queryByText } = renderForm({ onsuccess });
		await settle({
			type: "failure",
			status: 400,
			data: { errors: { name: ["Give the project a name."] } },
		});
		await settle({ type: "success", status: 200, data: { created: "Web" } });
		expect(onsuccess).toHaveBeenCalledWith({ created: "Web" });
		expect(queryByText("Give the project a name.") === null).toBe(true);
	});

	test("an actions snippet replaces the submit button", () => {
		const { queryByRole } = renderForm({
			actions: createRawSnippet(() => ({
				render: () => '<p data-testid="custom">Custom actions</p>',
			})),
		});
		expect(queryByRole("button", { name: "Save" }) === null).toBe(true);
	});
});
