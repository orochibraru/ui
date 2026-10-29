import { afterEach, describe, expect, test } from "bun:test";

import PaletteIcon from "@lucide/svelte/icons/palette";
import UserRoundIcon from "@lucide/svelte/icons/user-round";
import { cleanup, render } from "@testing-library/svelte";

import NavCards from "#lib/components/blocks/nav-cards.svelte";

describe("NavCards", () => {
	afterEach(() => cleanup());

	test("links every tab with its label and description", () => {
		const { getAllByRole, getByText } = render(NavCards, {
			tabs: [
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
			],
		});
		expect(
			getAllByRole("link").map((link) => link.getAttribute("href")),
		).toEqual(["/account/profile", "/account/appearance"]);
		expect(getByText("Profile")).toBeTruthy();
		expect(getByText("Light or dark.")).toBeTruthy();
	});
});
