import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";

import Button from "#lib/components/ui/button/button.svelte";

const label = createRawSnippet(() => ({ render: () => "<span>Save</span>" }));

describe("Button", () => {
	afterEach(() => cleanup());

	test("renders its label, enabled, when not loading", () => {
		const { getByRole, queryByRole } = render(Button, { children: label });
		const button = getByRole("button") as HTMLButtonElement;
		expect(button.disabled).toBe(false);
		expect(button.getAttribute("aria-busy")).toBeNull();
		expect(button.textContent).toBe("Save");
		expect(queryByRole("status")).toBeNull();
	});

	test("loading disables it and shows a spinner over its hidden label", () => {
		const { getByRole } = render(Button, { children: label, loading: true });
		const button = getByRole("button", { hidden: true }) as HTMLButtonElement;
		expect(button.disabled).toBe(true);
		expect(button.getAttribute("aria-busy")).toBe("true");
		expect(button.className).toContain("relative");
		expect(button.querySelector("span.invisible")?.textContent).toBe("Save");
		expect(
			getByRole("status", { hidden: true }).getAttribute("aria-label"),
		).toBe("Loading");
	});

	test("a loading link loses its href and is marked disabled", () => {
		const { container } = render(Button, {
			children: label,
			href: "/next",
			loading: true,
		});
		const link = container.querySelector("a");
		expect(link?.getAttribute("href")).toBeNull();
		expect(link?.getAttribute("aria-disabled")).toBe("true");
		expect(link?.getAttribute("tabindex")).toBe("-1");
	});
});
