import { afterEach, describe, expect, mock, test } from "bun:test";

import PaletteIcon from "@lucide/svelte/icons/palette";
import UserRoundIcon from "@lucide/svelte/icons/user-round";
import { cleanup, render } from "@testing-library/svelte";
import { flushSync } from "svelte";

const page = { url: new URL("http://localhost/account") };
const goto = mock((_href: string, _options?: unknown) => Promise.resolve());
let desktop = false;
const reactivity = await import("svelte/reactivity");
mock.module("$app/state", () => ({ page }));
mock.module("$app/navigation", () => ({ goto }));
mock.module("svelte/reactivity", () => ({
	...reactivity,
	MediaQuery: class {
		get current() {
			return desktop;
		}
	},
}));

const { default: TabSectionPage } =
	await import("../../fixtures/tab-section-page.svelte");

const tabs = [
	{
		href: "/account/profile",
		label: "Profile",
		description: "Your name.",
		icon: UserRoundIcon,
	},
	{
		href: "/account/appearance",
		label: "Appearance",
		description: "Light or dark.",
		icon: PaletteIcon,
	},
];

function open(pathname: string, onDesktop: boolean) {
	page.url = new URL(`http://localhost${pathname}`);
	desktop = onDesktop;
	goto.mockClear();
	const result = render(TabSectionPage, { tabs });
	flushSync();
	return result;
}

describe("TabSection", () => {
	afterEach(() => cleanup());

	test("on desktop, the index opens the first tab in place", () => {
		const { getByTestId } = open("/account", true);
		expect(goto.mock.calls).toEqual([["/account/profile", { replace: true }]]);
		expect(getByTestId("title").textContent).toBe("Account");
		expect(getByTestId("back").textContent).toBe("/");
	});

	test("on a phone, a tab is its own page titled by it, back to the cards", () => {
		const { getByTestId, getByText } = open("/account/appearance/theme", false);
		expect(goto).not.toHaveBeenCalled();
		expect(getByTestId("title").textContent).toBe("Appearance");
		expect(getByTestId("back").textContent).toBe("/account");
		expect(getByText("Tab content")).toBeTruthy();
	});

	test("on a phone, the index keeps the section title and its back link", () => {
		const { getByTestId } = open("/account", false);
		expect(goto).not.toHaveBeenCalled();
		expect(getByTestId("title").textContent).toBe("Account");
		expect(getByTestId("back").textContent).toBe("/");
	});
});
