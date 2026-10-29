import { afterEach, describe, expect, mock, test } from "bun:test";

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

const { default: Breadcrumbs } =
	await import("#lib/components/kit/breadcrumbs.svelte");

const short = [
	{ label: "Projects", href: "#projects" },
	{ label: "Website", href: "#website" },
	{ label: "Settings" },
];

const long = [
	{ label: "Files", href: "#files" },
	{ label: "Shared", href: "#shared" },
	{ label: "Design" },
	{ label: "Assets", href: "#assets" },
	{ label: "Icons", href: "#icons" },
	{ label: "Navigation icons" },
];

function setup(items: { label: string; href?: string }[], props = {}) {
	const result = render(Breadcrumbs, { items, ...props });
	flushSync();
	return result;
}

describe("Breadcrumbs", () => {
	afterEach(() => {
		cleanup();
		desktop = true;
	});

	test("links every crumb but the last, which is the current page", () => {
		setup(short);
		expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
		expect(
			screen.getByRole("link", { name: "Projects" }).getAttribute("href"),
		).toBe("#projects");
		expect(screen.getByRole("link", { name: "Website" })).toBeTruthy();
		expect(screen.queryByRole("link", { name: "Settings" })).toBeNull();
		expect(screen.getByText("Settings").getAttribute("aria-current")).toBe(
			"page",
		);
		expect(screen.queryByRole("button")).toBeNull();
	});

	test("on desktop, a long trail keeps the first and last two around an ellipsis menu", async () => {
		setup(long);
		expect(screen.getByRole("link", { name: "Files" })).toBeTruthy();
		expect(screen.getByRole("link", { name: "Icons" })).toBeTruthy();
		expect(screen.getByText("Navigation icons")).toBeTruthy();
		expect(screen.queryByText("Shared")).toBeNull();
		await fireEvent.pointerDown(
			screen.getByRole("button", { name: "Show hidden pages" }),
			{ button: 0, pointerType: "mouse" },
		);
		flushSync();
		expect(
			(await screen.findByRole("menuitem", { name: "Shared" })).getAttribute(
				"href",
			),
		).toBe("#shared");
		expect(screen.getByRole("menuitem", { name: "Assets" })).toBeTruthy();
		expect(
			screen
				.getByRole("menuitem", { name: "Design" })
				.hasAttribute("data-disabled"),
		).toBe(true);
	});

	test("on a phone, only the first crumb and the current page stay", async () => {
		desktop = false;
		setup(short, { messages: { label: "Fil d'Ariane", more: "Plus" } });
		expect(
			screen.getByRole("navigation", { name: "Fil d'Ariane" }),
		).toBeTruthy();
		expect(screen.getByRole("link", { name: "Projects" })).toBeTruthy();
		expect(screen.queryByRole("link", { name: "Website" })).toBeNull();
		expect(screen.getByText("Settings")).toBeTruthy();
		await fireEvent.click(screen.getByRole("button", { name: "Plus" }));
		flushSync();
		expect(screen.getByRole("dialog")).toBeTruthy();
		expect(
			screen.getByRole("link", { name: "Website" }).getAttribute("href"),
		).toBe("#website");
	});
});
