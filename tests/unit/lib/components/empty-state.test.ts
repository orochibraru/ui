import { afterEach, describe, expect, test } from "bun:test";

import UsersIcon from "@lucide/svelte/icons/users";
import { cleanup, render } from "@testing-library/svelte";

import EmptyState from "#lib/components/blocks/empty-state.svelte";

describe("EmptyState", () => {
	afterEach(() => cleanup());

	test("renders its title and subtitle", () => {
		const { getByText } = render(EmptyState, {
			icon: UsersIcon,
			title: "No groups yet",
			subtitle: "Create one.",
		});
		expect(getByText("No groups yet")).toBeTruthy();
		expect(getByText("Create one.")).toBeTruthy();
	});
});
