import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import BarList from "#lib/components/kit/bar-list.svelte";

const items = [
	{ label: "Documents", value: 50 },
	{ label: "Images", value: 200, href: "/files/images" },
	{ label: "Videos", value: 100 },
	{ label: "Archives", value: 0 },
];

function labels(container: HTMLElement) {
	return [...container.querySelectorAll("li")].map(
		(item) => item.querySelector(".truncate")?.textContent,
	);
}

describe("BarList", () => {
	afterEach(() => cleanup());

	test("ranks items by value with bars against the largest", () => {
		const { container, getByRole, getByText } = render(BarList, {
			items,
			format: (value: number) => `${value} files`,
		});
		expect(labels(container)).toEqual([
			"Images",
			"Videos",
			"Documents",
			"Archives",
		]);
		expect(getByText("100 files")).toBeTruthy();
		expect(getByRole("link").getAttribute("href")).toBe("/files/images");
		const widths = [
			...container.querySelectorAll<HTMLElement>(".bg-primary"),
		].map((bar) => bar.style.width);
		expect(widths).toEqual(["100%", "50%", "25%", "0%"]);
	});

	test("shows the first max items and toggles the rest", async () => {
		const { container, getByRole } = render(BarList, {
			items,
			max: 2,
			messages: { showAll: "Tout voir" },
		});
		expect(labels(container)).toEqual(["Images", "Videos"]);
		const toggle = getByRole("button", { name: "Tout voir" });
		await fireEvent.click(toggle);
		expect(labels(container)).toHaveLength(4);
		expect(toggle.textContent?.trim()).toBe("Show less");
	});

	test("says so when there is nothing to rank", () => {
		const { getByText } = render(BarList, { items: [] });
		expect(getByText("Nothing to show yet.")).toBeTruthy();
	});
});
