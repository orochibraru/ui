import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { flushSync } from "svelte";

let desktop = true;
const reactivity = await import("svelte/reactivity");
mock.module("svelte/reactivity", () => ({
	...reactivity,
	MediaQuery: class {
		get current() {
			return desktop;
		}
	},
}));

const { default: Pagination } =
	await import("#lib/components/kit/pagination.svelte");

function setup(props: Record<string, unknown>) {
	const result = render(Pagination, props as never);
	flushSync();
	return result;
}

function pageNumbers() {
	return screen
		.getAllByRole("button")
		.map((button) => button.textContent?.trim())
		.filter((label) => label && /^\d+$/.test(label));
}

describe("Pagination", () => {
	afterEach(() => {
		cleanup();
		desktop = true;
	});

	test("renders nothing when everything fits on one page", () => {
		setup({ total: 20, perPage: 20 });
		expect(screen.queryByRole("navigation")).toBeNull();
	});

	test("on desktop, shows the range and the pages around the current one", () => {
		setup({ page: 6, total: 236, perPage: 20 });
		expect(screen.getByText("101–120 of 236")).toBeTruthy();
		expect(pageNumbers()).toEqual(["1", "5", "6", "7", "12"]);
		expect(
			screen.getByRole("button", { name: "6" }).getAttribute("aria-current"),
		).toBe("page");
	});

	test("near either end, the window sticks to it", () => {
		setup({ page: 2, total: 236, perPage: 20 });
		expect(pageNumbers()).toEqual(["1", "2", "3", "4", "5", "12"]);
		cleanup();
		setup({ page: 11, total: 236, perPage: 20 });
		expect(pageNumbers()).toEqual(["1", "8", "9", "10", "11", "12"]);
		cleanup();
		setup({ page: 1, total: 50, perPage: 10 });
		expect(pageNumbers()).toEqual(["1", "2", "3", "4", "5"]);
	});

	test("buttons move the page and report it", async () => {
		const onchange = mock((_page: number) => {});
		setup({ total: 60, perPage: 20, onchange });
		const previous = screen.getByRole("button", {
			name: "Previous",
		}) as HTMLButtonElement;
		expect(previous.disabled).toBe(true);
		await fireEvent.click(screen.getByRole("button", { name: "Next" }));
		await fireEvent.click(screen.getByRole("button", { name: "3" }));
		flushSync();
		expect(onchange.mock.calls).toEqual([[2], [3]]);
		expect(
			(screen.getByRole("button", { name: "Next" }) as HTMLButtonElement)
				.disabled,
		).toBe(true);
		await fireEvent.click(screen.getByRole("button", { name: "3" }));
		expect(onchange).toHaveBeenCalledTimes(2);
	});

	test("with href, pages are links and the ends are disabled links", () => {
		setup({
			page: 1,
			total: 60,
			perPage: 20,
			href: (page: number) => `#page-${page}`,
		});
		expect(screen.getByRole("link", { name: "2" }).getAttribute("href")).toBe(
			"#page-2",
		);
		expect(
			screen.getByRole("link", { name: "Next" }).getAttribute("href"),
		).toBe("#page-2");
		const previous = screen.getByRole("link", { name: "Previous" });
		expect(previous.hasAttribute("href")).toBe(false);
		expect(previous.getAttribute("aria-disabled")).toBe("true");
	});

	test("on a phone, prev and next around Page N of M, in the app's words", async () => {
		desktop = false;
		setup({
			page: 2,
			total: 95,
			perPage: 10,
			messages: {
				previous: "Précédent",
				next: "Suivant",
				pageOf: (page: number, pageCount: number) =>
					`Page ${page} sur ${pageCount}`,
			},
		});
		expect(screen.getByText("Page 2 sur 10")).toBeTruthy();
		expect(pageNumbers()).toEqual([]);
		await fireEvent.click(screen.getByRole("button", { name: "Suivant" }));
		flushSync();
		expect(screen.getByText("Page 3 sur 10")).toBeTruthy();
		expect(screen.getByRole("button", { name: "Précédent" })).toBeTruthy();
	});
});
