import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, render } from "@testing-library/svelte";
import type { Component } from "svelte";

import AvatarGroup, { initials } from "#lib/components/kit/avatar-group.svelte";

import WithTooltips from "../../../fixtures/with-tooltips.svelte";

const avatarGroup = AvatarGroup as unknown as Component<
	Record<string, unknown>
>;

const people = [
	{ name: "Alex Martin" },
	{ name: "Sam Lee", src: "/sam.png" },
	{ name: "jordan" },
	{ name: "Robin Diaz" },
	{ name: "Casey Moreau" },
];

describe("AvatarGroup", () => {
	afterEach(() => cleanup());

	test("shows max avatars with initials, then a count naming the rest", () => {
		const { getByRole, getByText } = render(WithTooltips, {
			component: avatarGroup,
			innerProps: { people, max: 3 },
		});
		expect(getByRole("button", { name: "Alex Martin" })).toBeTruthy();
		expect(getByText("AM")).toBeTruthy();
		expect(getByText("J")).toBeTruthy();
		const more = getByRole("button", { name: "Robin Diaz, Casey Moreau" });
		expect(more.textContent?.trim()).toBe("+2");
	});

	test("has no count when everyone fits", () => {
		const { queryByText, getAllByRole } = render(WithTooltips, {
			component: avatarGroup,
			innerProps: { people: people.slice(0, 2) },
		});
		expect(getAllByRole("button")).toHaveLength(2);
		expect(queryByText(/^\+/)).toBeNull();
	});

	test("takes initials from the first two words", () => {
		expect(initials("  ada  lovelace byron ")).toBe("AL");
	});
});
