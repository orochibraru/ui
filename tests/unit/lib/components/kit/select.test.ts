import { afterEach, describe, expect, mock, test } from "bun:test";

import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/svelte";
import { Dialog } from "bits-ui";
import { flushSync, tick } from "svelte";

let desktop = true;
const reactivity = await import("svelte/reactivity");
mock.module("vaul-svelte", () => ({
	Drawer: { ...Dialog, NestedRoot: Dialog.Root },
}));
mock.module("svelte/reactivity", () => ({
	...reactivity,
	MediaQuery: class {
		get current() {
			return desktop;
		}
	},
}));

const { default: Select } = await import("#lib/components/kit/select.svelte");

const options = [
	{ value: "viewer", label: "Viewer", description: "Can read" },
	{ value: "editor", label: "Editor" },
	{ value: "owner", label: "Owner", disabled: true },
];

function mount(onDesktop: boolean, props: Record<string, unknown> = {}) {
	desktop = onDesktop;
	const form = document.createElement("form");
	document.body.append(form);
	const onValueChange = mock((_value: string) => {});
	const result = render(Select, {
		target: form,
		props: { label: "Role", name: "role", options, onValueChange, ...props },
	});
	flushSync();
	return { ...result, form, onValueChange };
}

describe("Select", () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = "";
		desktop = true;
	});

	test("labels the trigger, shows the placeholder and points at the description", () => {
		const { getByLabelText, getByText } = mount(true, {
			description: "What they can do.",
			required: true,
		});
		const trigger = getByLabelText(/Role/);
		expect(trigger.textContent).toContain("Select an option");
		expect(trigger.getAttribute("aria-required")).toBe("true");
		expect(trigger.getAttribute("aria-describedby")).toBe(
			getByText("What they can do.").id,
		);
		expect(trigger.hasAttribute("aria-invalid")).toBe(false);
	});

	test("an error replaces the description and marks the trigger invalid", () => {
		const { getByLabelText, getByText, queryByText } = mount(true, {
			description: "What they can do.",
			error: ["Pick a role."],
		});
		const trigger = getByLabelText("Role");
		expect(trigger.getAttribute("aria-invalid")).toBe("true");
		expect(trigger.getAttribute("aria-describedby")).toBe(
			getByText("Pick a role.").closest("[id]")?.id ?? "",
		);
		expect(queryByText("What they can do.") === null).toBe(true);
	});

	test("posts the value under its name, and nothing when disabled", () => {
		const { form } = mount(true, { value: "editor" });
		expect(new FormData(form).get("role")).toBe("editor");
		cleanup();
		const disabled = mount(true, { value: "editor", disabled: true });
		expect(disabled.form.querySelector("button")?.disabled).toBe(true);
		expect(new FormData(disabled.form).get("role")).toBeNull();
	});

	test("on desktop, picking from the select updates the value", async () => {
		const { getByLabelText, form, onValueChange } = mount(true);
		const trigger = getByLabelText("Role");
		await fireEvent.pointerDown(trigger, { button: 0, pointerType: "mouse" });
		await tick();
		await fireEvent.pointerUp(
			await screen.findByRole("option", { name: /Editor/ }),
		);
		await tick();
		await waitFor(() => expect(onValueChange).toHaveBeenCalledWith("editor"));
		expect(new FormData(form).get("role")).toBe("editor");
		expect(trigger.textContent).toContain("Editor");
	});

	test("searchable on desktop, a popover filters the options", async () => {
		const { getByLabelText, form, onValueChange } = mount(true, {
			searchable: true,
		});
		await fireEvent.click(getByLabelText("Role"));
		await tick();
		const search = screen.getByPlaceholderText("Search…");
		await fireEvent.input(search, { target: { value: "edi" } });
		await tick();
		await waitFor(() =>
			expect(screen.queryByText("Viewer") === null).toBe(true),
		);
		await fireEvent.click(screen.getByText("Editor"));
		await tick();
		expect(onValueChange).toHaveBeenCalledWith("editor");
		expect(new FormData(form).get("role")).toBe("editor");
	});

	test("on a phone, the options open in a drawer with search", async () => {
		const { getByLabelText, form, onValueChange } = mount(false, {
			searchable: true,
		});
		const trigger = getByLabelText("Role");
		expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
		await fireEvent.click(trigger);
		await tick();
		const drawer = screen.getByRole("dialog");
		expect(drawer.textContent).toContain("Role");
		expect(drawer.textContent).toContain("Can read");
		expect(screen.getByPlaceholderText("Search…")).toBeTruthy();
		await fireEvent.click(screen.getByText("Viewer"));
		await tick();
		expect(onValueChange).toHaveBeenCalledWith("viewer");
		expect(new FormData(form).get("role")).toBe("viewer");
		await waitFor(() =>
			expect(screen.queryByRole("dialog") === null).toBe(true),
		);
		expect(trigger.textContent).toContain("Viewer");
	});

	test("a disabled option can't be picked", async () => {
		const { getByLabelText, onValueChange } = mount(false);
		await fireEvent.click(getByLabelText("Role"));
		await tick();
		await fireEvent.click(screen.getByText("Owner"));
		await tick();
		expect(onValueChange).not.toHaveBeenCalled();
	});

	test("messages and placeholder override the English defaults", async () => {
		const { getByLabelText } = mount(false, {
			searchable: true,
			messages: { placeholder: "Choisir", search: "Chercher", empty: "Rien." },
		});
		const trigger = getByLabelText("Role");
		expect(trigger.textContent).toContain("Choisir");
		await fireEvent.click(trigger);
		await tick();
		await fireEvent.input(screen.getByPlaceholderText("Chercher"), {
			target: { value: "zzz" },
		});
		await waitFor(() => expect(screen.getByText("Rien.")).toBeTruthy());
		cleanup();
		const custom = mount(true, { placeholder: "Who is it" });
		expect(custom.getByLabelText("Role").textContent).toContain("Who is it");
	});
});
