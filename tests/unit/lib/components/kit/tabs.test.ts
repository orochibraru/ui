import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { flushSync } from "svelte";

const { default: TabsPage } =
	await import("../../../fixtures/kit-tabs-page.svelte");

const items = [
	{ value: "files", label: "Files", badge: 12 },
	{ value: "members", label: "Members" },
	{ value: "archive", label: "Archive", disabled: true },
];

function setup(props: Record<string, unknown> = {}) {
	const result = render(TabsPage, { items, ...props } as never);
	flushSync();
	return result;
}

describe("Tabs", () => {
	afterEach(() => cleanup());

	test("starts on the first tab and renders its panel", () => {
		setup();
		const files = screen.getByRole("tab", { name: /Files/ });
		expect(files.getAttribute("aria-selected")).toBe("true");
		expect(files.textContent).toContain("12");
		expect(screen.getByRole("tabpanel").textContent).toContain("Panel files");
		expect(screen.getByTestId("bound").textContent).toBe("files");
	});

	test("selecting a tab swaps the panel and updates the bound value", async () => {
		setup();
		await fireEvent.click(screen.getByRole("tab", { name: "Members" }));
		flushSync();
		expect(
			screen
				.getByRole("tab", { name: "Members" })
				.getAttribute("aria-selected"),
		).toBe("true");
		expect(screen.getByTestId("panel").textContent).toBe("Panel members");
		expect(screen.getByTestId("bound").textContent).toBe("members");
	});

	test("a bound value picks the tab, and disabled tabs stay unselectable", async () => {
		setup({ value: "members" });
		expect(screen.getByTestId("panel").textContent).toBe("Panel members");
		const archive = screen.getByRole("tab", { name: "Archive" });
		expect((archive as HTMLButtonElement).disabled).toBe(true);
		await fireEvent.click(archive);
		flushSync();
		expect(screen.getByTestId("bound").textContent).toBe("members");
	});

	test("the tab list scrolls in its own row instead of wrapping", () => {
		setup();
		const list = screen.getByRole("tablist");
		expect(list.className).toContain("w-max");
		expect(list.parentElement?.className).toContain("overflow-x-auto");
	});
});
