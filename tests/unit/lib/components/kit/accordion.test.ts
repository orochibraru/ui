import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import Accordion from "#lib/components/kit/accordion.svelte";

const items = [
	{ title: "Who can see a project?", content: "Every member." },
	{
		title: "Can I restore a file?",
		content: "Yes, for 30 days.",
		value: "restore",
	},
];

function expanded(trigger: HTMLElement) {
	return trigger.getAttribute("aria-expanded");
}

describe("Accordion", () => {
	afterEach(() => cleanup());

	test("opens the bound item and keeps one open at a time", async () => {
		const { getByRole, getByText } = render(Accordion, {
			items,
			value: "restore",
		});
		const first = getByRole("button", { name: "Who can see a project?" });
		const second = getByRole("button", { name: "Can I restore a file?" });
		expect(expanded(second)).toBe("true");
		expect(getByText("Yes, for 30 days.")).toBeTruthy();
		await fireEvent.click(first);
		expect(expanded(first)).toBe("true");
		expect(expanded(second)).toBe("false");
	});

	test("lets several items stay open with type multiple", async () => {
		const { getByRole } = render(Accordion, { items, type: "multiple" });
		const first = getByRole("button", { name: "Who can see a project?" });
		const second = getByRole("button", { name: "Can I restore a file?" });
		await fireEvent.click(first);
		await fireEvent.click(second);
		expect(expanded(first)).toBe("true");
		expect(expanded(second)).toBe("true");
	});
});
