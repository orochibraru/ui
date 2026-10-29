import { afterEach, describe, expect, mock, test } from "bun:test";

import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/svelte";
import { Dialog } from "bits-ui";
import { flushSync } from "svelte";

const goto = mock((_href: string) => Promise.resolve());
let desktop = true;
const reactivity = await import("svelte/reactivity");
mock.module("$app/navigation", () => ({ goto }));
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

const { default: CommandPalette } =
	await import("#lib/components/blocks/command-palette.svelte");

const create = mock(() => {});

const groups = [
	{
		heading: "Navigation",
		items: [
			{ label: "Home", href: "/home" },
			{ label: "Team", href: "/team", keywords: ["members"] },
		],
	},
	{
		heading: "Actions",
		items: [{ label: "New document", shortcut: "⌘N", onSelect: create }],
	},
];

function press(target: Element = document.body) {
	fireEvent.keyDown(target, { key: "k", metaKey: true, ctrlKey: true });
	flushSync();
}

function setup(props: Record<string, unknown> = {}) {
	goto.mockClear();
	create.mockClear();
	const result = render(CommandPalette, { groups, ...props });
	flushSync();
	return result;
}

function type(term: string) {
	const input = screen.getByPlaceholderText("Type a command or search…");
	fireEvent.input(input, { target: { value: term } });
	flushSync();
}

async function gone(find: () => HTMLElement | null) {
	await waitFor(() => expect(find() === null).toBe(true));
}

async function closed() {
	await gone(() => screen.queryByRole("dialog"));
}

describe("CommandPalette", () => {
	afterEach(() => {
		cleanup();
		desktop = true;
	});

	test("the shortcut opens the palette with its groups and shortcuts", () => {
		setup();
		expect(screen.queryByRole("dialog")).toBeNull();
		press();
		expect(screen.getByRole("dialog")).toBeTruthy();
		expect(screen.getByText("Navigation")).toBeTruthy();
		expect(screen.getByText("⌘N")).toBeTruthy();
	});

	test("the trigger opens it too", () => {
		setup();
		fireEvent.click(screen.getByRole("button", { name: "Search" }));
		flushSync();
		expect(screen.getByRole("dialog")).toBeTruthy();
	});

	test("typing filters the items, keywords included, and reports the term", async () => {
		const onsearch = mock((_term: string) => {});
		setup({ open: true, onsearch });
		type("members");
		expect(onsearch).toHaveBeenLastCalledWith("members");
		expect(screen.getByText("Team")).toBeTruthy();
		await gone(() => screen.queryByText("Home"));
		await gone(() => screen.queryByText("New document"));
	});

	test("matches whole words, not letters scattered through a label", async () => {
		setup({
			open: true,
			groups: [
				{
					heading: "Blocks",
					items: [
						{ label: "Otp field", href: "/otp" },
						{ label: "Install prompt", href: "/install" },
						{ label: "Input", href: "/input", keywords: ["input-otp"] },
					],
				},
			],
		});
		type("otp");
		expect(screen.getByText("Otp field")).toBeTruthy();
		expect(screen.getByText("Input")).toBeTruthy();
		await gone(() => screen.queryByText("Install prompt"));
	});

	test("with filter off, every item stays for the server to narrow", () => {
		setup({ open: true, filter: false });
		type("members");
		expect(screen.getByText("Home")).toBeTruthy();
		expect(screen.getByText("New document")).toBeTruthy();
	});

	test("selecting an action runs it, closes and clears the search", async () => {
		const onsearch = mock((_term: string) => {});
		setup({ open: true, onsearch });
		type("new");
		fireEvent.click(screen.getByText("New document"));
		flushSync();
		expect(create).toHaveBeenCalledTimes(1);
		expect(goto).not.toHaveBeenCalled();
		expect(onsearch).toHaveBeenLastCalledWith("");
		await closed();
	});

	test("selecting a link navigates to it and closes", async () => {
		setup({ open: true });
		fireEvent.click(screen.getByText("Team"));
		flushSync();
		expect(goto).toHaveBeenCalledWith("/team");
		await closed();
	});

	test("the shortcut is ignored while typing in a field, unless open", async () => {
		setup();
		const field = document.createElement("input");
		document.body.append(field);
		press(field);
		expect(screen.queryByRole("dialog")).toBeNull();
		press();
		expect(screen.getByRole("dialog")).toBeTruthy();
		press(screen.getByPlaceholderText("Type a command or search…"));
		await closed();
		field.remove();
	});

	test("without shortcut or trigger, only the bound open shows it", () => {
		setup({ shortcut: false, trigger: false });
		expect(screen.queryByRole("button", { name: "Search" })).toBeNull();
		press();
		expect(screen.queryByRole("dialog")).toBeNull();
	});

	test("messages override the copy", async () => {
		setup({
			open: true,
			messages: { label: "Chercher", empty: "Aucun résultat." },
		});
		expect(screen.getByRole("button", { name: "Chercher" })).toBeTruthy();
		type("zzz");
		await waitFor(() =>
			expect(screen.getByText("Aucun résultat.")).toBeTruthy(),
		);
	});

	test("on a phone, the same list sits in a bottom drawer", () => {
		desktop = false;
		setup({ open: true });
		expect(screen.getByRole("dialog")).toBeTruthy();
		fireEvent.click(screen.getByText("Home"));
		flushSync();
		expect(goto).toHaveBeenCalledWith("/home");
	});
});
