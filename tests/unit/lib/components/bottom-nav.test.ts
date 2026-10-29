import { afterEach, describe, expect, mock, test } from "bun:test";

import HouseIcon from "@lucide/svelte/icons/house";
import UsersIcon from "@lucide/svelte/icons/users";
import { cleanup, render } from "@testing-library/svelte";
import { flushSync } from "svelte";

const page = { url: new URL("http://localhost/groups/abc") };
mock.module("$app/state", () => ({ page }));

const { default: BottomNav, isUnder } =
	await import("#lib/components/blocks/bottom-nav.svelte");

const items = [
	{ href: "/", label: "Home", icon: HouseIcon },
	{ href: "/groups", label: "Groups", icon: UsersIcon },
];

describe("BottomNav", () => {
	afterEach(() => cleanup());

	test("marks the destination the current page sits under", () => {
		const { getByRole } = render(BottomNav, { items });
		expect(
			getByRole("link", { name: "Groups" }).getAttribute("aria-current"),
		).toBe("page");
		expect(
			getByRole("link", { name: "Home" }).hasAttribute("aria-current"),
		).toBe(false);
	});

	test("keeps only the icons while scrolling down, the labels back going up", () => {
		const { getByRole } = render(BottomNav, { items });
		const nav = getByRole("navigation");
		const scrollTo = (y: number) => {
			Object.defineProperty(window, "scrollY", {
				configurable: true,
				value: y,
			});
			window.dispatchEvent(new Event("scroll"));
			flushSync();
		};
		scrollTo(300);
		expect(nav.dataset.compact).toBe("true");
		expect(getByRole("link", { name: "Groups" })).toBeTruthy();
		scrollTo(200);
		expect(nav.dataset.compact).toBeUndefined();
		scrollTo(0);
	});

	test("lets the app decide what counts as active", () => {
		const { getByRole } = render(BottomNav, {
			items,
			isActive: (_pathname: string, href: string) => href === "/",
		});
		expect(
			getByRole("link", { name: "Home" }).getAttribute("aria-current"),
		).toBe("page");
	});
});

describe("isUnder", () => {
	test("matches a destination and its subpages, the root only itself", () => {
		expect(isUnder("/groups", "/groups")).toBe(true);
		expect(isUnder("/groups/abc", "/groups")).toBe(true);
		expect(isUnder("/groupsish", "/groups")).toBe(false);
		expect(isUnder("/", "/")).toBe(true);
		expect(isUnder("/groups", "/")).toBe(false);
	});
});
