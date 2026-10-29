import { afterEach, describe, expect, mock, test } from "bun:test";

import PencilIcon from "@lucide/svelte/icons/pencil";
import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { Dialog } from "bits-ui";
import { flushSync } from "svelte";

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

const { default: Menu } = await import("#lib/components/kit/menu.svelte");
const { default: WithTooltips } =
	await import("../../../fixtures/with-tooltips.svelte");
const { default: MenuWithTrigger } =
	await import("../../../fixtures/kit-menu-trigger.svelte");

const rename = mock(() => {});
const remove = mock(() => {});

const items = [
	{ label: "Open", href: "#open" },
	{ label: "Rename", icon: PencilIcon, shortcut: "R", onSelect: rename },
	{ label: "Archive", disabled: true },
	"separator" as const,
	{ label: "Delete", destructive: true, onSelect: remove },
];

function setup(props: Record<string, unknown> = {}) {
	rename.mockClear();
	remove.mockClear();
	const result = render(WithTooltips, {
		component: Menu as never,
		innerProps: { items, ...props },
	});
	flushSync();
	return result;
}

async function openDropdown(name = "More actions") {
	await fireEvent.pointerDown(screen.getByRole("button", { name }), {
		button: 0,
		pointerType: "mouse",
	});
	flushSync();
}

describe("Menu", () => {
	afterEach(() => {
		cleanup();
		desktop = true;
	});

	test("on desktop, the More button opens a dropdown of the items", async () => {
		setup();
		expect(screen.queryByRole("menu")).toBeNull();
		await openDropdown();
		expect(await screen.findByRole("menu")).toBeTruthy();
		expect(screen.getByRole("menuitem", { name: /Rename/ })).toBeTruthy();
		expect(screen.getByText("R")).toBeTruthy();
		expect(screen.getByRole("separator")).toBeTruthy();
		expect(
			screen.getByRole("menuitem", { name: "Open" }).getAttribute("href"),
		).toBe("#open");
		expect(
			screen
				.getByRole("menuitem", { name: "Archive" })
				.hasAttribute("data-disabled"),
		).toBe(true);
		expect(
			screen
				.getByRole("menuitem", { name: "Delete" })
				.getAttribute("data-variant"),
		).toBe("destructive");
	});

	test("selecting an item runs it and closes the dropdown", async () => {
		rename.mockClear();
		render(MenuWithTrigger, { items });
		await openDropdown("Team");
		await fireEvent.click(
			await screen.findByRole("menuitem", { name: /Rename/ }),
		);
		flushSync();
		expect(rename).toHaveBeenCalledTimes(1);
		await Bun.sleep(50);
		expect(screen.queryByRole("menu")).toBeNull();
	});

	test("on a phone, the trigger opens a drawer of full-width actions", async () => {
		desktop = false;
		remove.mockClear();
		render(MenuWithTrigger, { items, title: "Website redesign" });
		const trigger = screen.getByRole("button", { name: "Team" });
		expect(trigger.getAttribute("aria-expanded")).toBe("false");
		await fireEvent.click(trigger);
		flushSync();
		expect(screen.getByRole("dialog")).toBeTruthy();
		expect(screen.getByText("Website redesign")).toBeTruthy();
		expect(screen.queryByText("R")).toBeNull();
		expect(
			screen.getByRole("link", { name: "Open" }).getAttribute("href"),
		).toBe("#open");
		expect(
			(screen.getByRole("button", { name: "Archive" }) as HTMLButtonElement)
				.disabled,
		).toBe(true);
		await fireEvent.click(screen.getByRole("button", { name: "Delete" }));
		flushSync();
		expect(remove).toHaveBeenCalledTimes(1);
		await Bun.sleep(50);
		expect(screen.queryByRole("dialog")).toBeNull();
	});

	test("label and messages name the trigger", () => {
		setup({ messages: { label: "Plus d'actions" } });
		expect(screen.getByRole("button", { name: "Plus d'actions" })).toBeTruthy();
		cleanup();
		setup({ label: "Project actions", messages: { label: "Ignored" } });
		expect(
			screen.getByRole("button", { name: "Project actions" }),
		).toBeTruthy();
	});

	test("a custom trigger receives the props that open the menu", async () => {
		render(MenuWithTrigger, { items });
		await openDropdown("Team");
		expect(await screen.findByRole("menu")).toBeTruthy();
		cleanup();
		desktop = false;
		render(MenuWithTrigger, { items });
		await fireEvent.click(screen.getByRole("button", { name: "Team" }));
		flushSync();
		expect(screen.getByRole("dialog")).toBeTruthy();
	});
});
