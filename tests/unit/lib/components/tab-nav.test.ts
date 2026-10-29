import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, render } from "@testing-library/svelte";

const page = { url: new URL("http://localhost/account/security") };
mock.module("$app/state", () => ({ page }));

const { default: TabNav } =
	await import("#lib/components/blocks/tab-nav.svelte");

describe("TabNav", () => {
	afterEach(() => cleanup());

	test("marks the tab of the current page", () => {
		const { getByRole } = render(TabNav, {
			tabs: [
				{ href: "/account/profile", label: "Profile" },
				{ href: "/account/security", label: "Security" },
			],
		});
		expect(
			getByRole("link", { name: "Security" }).getAttribute("aria-current"),
		).toBe("page");
		expect(
			getByRole("link", { name: "Profile" }).hasAttribute("aria-current"),
		).toBe(false);
	});
});
