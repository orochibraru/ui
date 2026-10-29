import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render, within } from "@testing-library/svelte";

import DataTable from "#lib/components/kit/data-table.svelte";

interface Member {
	name: string;
	role: string;
	projects: number | null;
}

const members: Member[] = [
	{ name: "Sam Lee", role: "Editor", projects: 3 },
	{ name: "Alex Martin", role: "Owner", projects: 12 },
	{ name: "Jordan Kim", role: "Viewer", projects: null },
];

const columns = [
	{ key: "name" as const, label: "Name", sortable: true },
	{ key: "role" as const, label: "Role", hideOnMobile: true },
	{
		key: "projects" as const,
		label: "Projects",
		align: "right" as const,
		sortable: true,
		format: (value: number | null) => (value === null ? "None" : `${value}`),
	},
];

function table(container: HTMLElement) {
	const element = container.querySelector("table");
	if (!element) {
		throw new Error("No table rendered");
	}
	return element;
}

function names(container: HTMLElement) {
	return [...table(container).querySelectorAll("tbody tr")].map((row) =>
		row.querySelector("td")?.textContent?.trim(),
	);
}

describe("DataTable", () => {
	afterEach(() => cleanup());

	test("renders a header per column and formats cells", () => {
		const { container } = render(DataTable<Member>, {
			columns,
			rows: members,
		});
		const scope = within(table(container));
		expect(
			scope
				.getAllByRole("columnheader")
				.map((head) => head.textContent?.trim()),
		).toEqual(["Name", "Role", "Projects"]);
		expect(scope.getByText("None")).toBeTruthy();
		expect(scope.getByText("12").closest("td")?.className).toContain(
			"text-right",
		);
	});

	test("sorts on a header click, flips on the next, and sets aria-sort", async () => {
		const { container } = render(DataTable<Member>, {
			columns,
			rows: members,
		});
		const scope = within(table(container));
		const projects = scope.getByRole("button", { name: "Projects" });
		await fireEvent.click(projects);
		expect(names(container)).toEqual(["Sam Lee", "Alex Martin", "Jordan Kim"]);
		expect(projects.closest("th")?.getAttribute("aria-sort")).toBe("ascending");
		await fireEvent.click(projects);
		expect(names(container)).toEqual(["Alex Martin", "Sam Lee", "Jordan Kim"]);
		expect(projects.closest("th")?.getAttribute("aria-sort")).toBe(
			"descending",
		);
		await fireEvent.click(scope.getByRole("button", { name: "Name" }));
		expect(names(container)).toEqual(["Alex Martin", "Jordan Kim", "Sam Lee"]);
		expect(projects.closest("th")?.hasAttribute("aria-sort")).toBe(false);
	});

	test("links each row and stacks cards for phones without hidden columns", () => {
		const { container } = render(DataTable<Member>, {
			columns,
			rows: members,
			rowHref: (member: Member) => `/members/${member.name}`,
		});
		expect(
			within(table(container))
				.getByRole("link", { name: "Alex Martin" })
				.getAttribute("href"),
		).toBe("/members/Alex Martin");
		const cards = container.querySelectorAll("ul > li");
		expect(cards).toHaveLength(3);
		const card = within(cards[0] as HTMLElement);
		expect(card.getByRole("link").textContent?.trim()).toBe("Sam Lee");
		expect(card.getByText("Projects")).toBeTruthy();
		expect(card.queryByText("Role")).toBeNull();
	});

	test("calls onrowclick with the row", async () => {
		const onrowclick = mock((_member: Member) => {});
		const { container } = render(DataTable<Member>, {
			columns,
			rows: members,
			onrowclick,
		});
		await fireEvent.click(
			within(table(container)).getByRole("button", { name: "Jordan Kim" }),
		);
		expect(onrowclick.mock.calls).toEqual([[members[2] as Member]]);
	});

	test("shows the empty message in the app's words, and skeletons while loading", () => {
		const { getByText, unmount } = render(DataTable<Member>, {
			columns,
			rows: [],
			messages: { empty: "Aucun membre" },
		});
		expect(getByText("Aucun membre")).toBeTruthy();
		unmount();
		const { container } = render(DataTable<Member>, {
			columns,
			rows: [],
			loading: true,
		});
		expect(container.querySelector("[aria-busy='true']")).toBeTruthy();
		expect(
			container.querySelectorAll("[data-slot='skeleton']").length,
		).toBeGreaterThan(0);
		expect(container.textContent).not.toContain("Nothing here yet.");
	});
});
