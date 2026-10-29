import { afterEach, describe, expect, mock, test } from "bun:test";

import { getLocalTimeZone, today } from "@internationalized/date";
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/svelte";
import { Dialog } from "bits-ui";
import { flushSync, tick } from "svelte";

let desktop = true;
const reactivity = await import("svelte/reactivity");
mock.module("vaul-svelte", () => ({
	Drawer: { ...Dialog, NestedRoot: Dialog.Root },
}));
mock.module("svelte/reactivity", () => ({
	...reactivity,
	MediaQuery: class {
		get current() {
			return desktop;
		}
	},
}));

const { default: DateField } =
	await import("#lib/components/kit/date-field.svelte");

function mount(onDesktop: boolean, props: Record<string, unknown> = {}) {
	desktop = onDesktop;
	const form = document.createElement("form");
	document.body.append(form);
	const result = render(DateField, {
		target: form,
		props: { label: "Start date", name: "start", ...props },
	});
	flushSync();
	return { ...result, form };
}

function dayButton(date: string) {
	return document.querySelector(
		`[data-bits-day][data-value="${date}"]:not([data-outside-month])`,
	) as HTMLElement;
}

describe("DateField", () => {
	afterEach(() => {
		cleanup();
		document.body.innerHTML = "";
		desktop = true;
	});

	test("labels the trigger, shows the placeholder and points at the description", () => {
		const { getByLabelText, getByText } = mount(true, {
			description: "The first day.",
			required: true,
		});
		const trigger = getByLabelText(/Start date/);
		expect(trigger.textContent).toContain("Pick a date");
		expect(trigger.getAttribute("aria-required")).toBe("true");
		expect(trigger.getAttribute("aria-describedby")).toBe(
			getByText("The first day.").id,
		);
		expect(trigger.hasAttribute("aria-invalid")).toBe(false);
	});

	test("an error replaces the description and marks the trigger invalid", () => {
		const { getByLabelText, getByText, queryByText } = mount(true, {
			description: "The first day.",
			error: "Pick a later date.",
		});
		const trigger = getByLabelText("Start date");
		expect(trigger.getAttribute("aria-invalid")).toBe("true");
		expect(trigger.getAttribute("aria-describedby")).toBe(
			getByText("Pick a later date.").closest("[id]")?.id ?? "",
		);
		expect(queryByText("The first day.") === null).toBe(true);
	});

	test("posts the ISO date under its name and shows it formatted", () => {
		const { getByLabelText, form } = mount(true, { value: "2026-03-02" });
		expect(new FormData(form).get("start")).toBe("2026-03-02");
		expect(getByLabelText("Start date").textContent).toContain("2026");
	});

	test("a malformed value shows the placeholder instead of throwing", () => {
		const { getByLabelText } = mount(true, { value: "not a date" });
		expect(getByLabelText("Start date").textContent).toContain("Pick a date");
	});

	test("on desktop, picking a day in the popover sets the value", async () => {
		const { getByLabelText, form } = mount(true, { value: "2026-10-10" });
		await fireEvent.click(getByLabelText("Start date"));
		await tick();
		await fireEvent.click(dayButton("2026-10-14"));
		await tick();
		expect(new FormData(form).get("start")).toBe("2026-10-14");
	});

	test("min and max bound the calendar and hide shortcuts out of range", async () => {
		const { getByLabelText } = mount(true, {
			value: "2026-10-10",
			min: "2026-10-05",
			max: "2026-10-20",
		});
		await fireEvent.click(getByLabelText("Start date"));
		await tick();
		expect(dayButton("2026-10-04").hasAttribute("data-disabled")).toBe(true);
		expect(dayButton("2026-10-21").hasAttribute("data-disabled")).toBe(true);
		expect(dayButton("2026-10-12").hasAttribute("data-disabled")).toBe(false);
		expect(screen.queryByRole("button", { name: "Today" }) === null).toBe(true);
	});

	test("on a phone, a drawer offers today and the calendar", async () => {
		const { getByLabelText, form } = mount(false);
		const trigger = getByLabelText("Start date");
		expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
		await fireEvent.click(trigger);
		await tick();
		expect(screen.getByRole("dialog").textContent).toContain("Start date");
		await fireEvent.click(screen.getByRole("button", { name: "Today" }));
		await tick();
		expect(new FormData(form).get("start")).toBe(
			today(getLocalTimeZone()).toString(),
		);
		await waitFor(() =>
			expect(screen.queryByRole("dialog") === null).toBe(true),
		);
	});

	test("disabled, it neither opens nor posts", async () => {
		const { getByLabelText, form } = mount(false, {
			value: "2026-03-02",
			disabled: true,
		});
		const trigger = getByLabelText("Start date") as HTMLButtonElement;
		expect(trigger.disabled).toBe(true);
		expect(new FormData(form).get("start")).toBeNull();
	});

	test("messages and placeholder override the English defaults", async () => {
		const { getByLabelText } = mount(false, {
			messages: {
				placeholder: "Choisir",
				today: "Aujourd'hui",
				yesterday: "Hier",
			},
		});
		const trigger = getByLabelText("Start date");
		expect(trigger.textContent).toContain("Choisir");
		await fireEvent.click(trigger);
		await tick();
		expect(screen.getByRole("button", { name: "Aujourd'hui" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "Hier" })).toBeTruthy();
		cleanup();
		const custom = mount(true, { placeholder: "When" });
		expect(custom.getByLabelText("Start date").textContent).toContain("When");
	});
});
