import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";
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

const {
	default: TimeRangePicker,
	defaultTimeRangePresets,
	rangeFor,
} = await import("#lib/components/blocks/time-range-picker.svelte");

const day = 86_400_000;
const week = {
	preset: "7d",
	start: new Date(2026, 9, 10, 15, 30),
	end: new Date(2026, 9, 17, 15, 30),
};

function mount(onDesktop: boolean, props: Record<string, unknown> = {}) {
	desktop = onDesktop;
	const onchange = mock(
		(_value: { preset: string; start: Date; end: Date }) => {},
	);
	const result = render(TimeRangePicker, { value: week, onchange, ...props });
	flushSync();
	return { ...result, onchange };
}

function lastChange(onchange: ReturnType<typeof mock>) {
	return onchange.mock.calls.at(-1)?.[0] as {
		preset: string;
		start: Date;
		end: Date;
	};
}

describe("rangeFor", () => {
	const now = new Date(2026, 9, 29, 12);

	test("a duration preset ends now and starts that long before", () => {
		const range = rangeFor(
			{ id: "7d", label: "7 days", duration: 7 * day },
			now,
		);
		expect(range).toEqual({
			preset: "7d",
			start: new Date(now.getTime() - 7 * day),
			end: now,
		});
	});

	test("a function preset decides its own window", () => {
		const yearly = defaultTimeRangePresets.find(
			(preset) => preset.id === "12m",
		);
		expect(yearly && rangeFor(yearly, now)).toEqual({
			preset: "12m",
			start: new Date(2025, 9, 29, 12),
			end: now,
		});
		const today = rangeFor(
			{
				id: "today",
				label: "Today",
				range: (current) => ({
					start: new Date(
						current.getFullYear(),
						current.getMonth(),
						current.getDate(),
					),
					end: current,
				}),
			},
			now,
		);
		expect(today.start).toEqual(new Date(2026, 9, 29));
	});

	test("the defaults cover a day to a year", () => {
		expect(defaultTimeRangePresets.map((preset) => preset.id)).toEqual([
			"24h",
			"7d",
			"30d",
			"90d",
			"12m",
		]);
	});
});

describe("TimeRangePicker", () => {
	afterEach(() => cleanup());

	test("picking a preset updates the value from now", async () => {
		const { getByRole, onchange } = mount(true);
		expect(
			getByRole("radio", { name: "7 days" }).getAttribute("aria-checked"),
		).toBe("true");
		const before = Date.now();
		await fireEvent.click(getByRole("radio", { name: "90 days" }));
		const change = lastChange(onchange);
		expect(change.preset).toBe("90d");
		expect(change.end.getTime()).toBeGreaterThanOrEqual(before);
		expect(change.end.getTime() - change.start.getTime()).toBe(90 * day);
		expect(
			getByRole("radio", { name: "90 days" }).getAttribute("aria-checked"),
		).toBe("true");
	});

	test("picking the current preset again keeps it selected", async () => {
		const { getByRole, onchange } = mount(true);
		await fireEvent.click(getByRole("radio", { name: "7 days" }));
		await tick();
		expect(onchange).not.toHaveBeenCalled();
		expect(
			getByRole("radio", { name: "7 days" }).getAttribute("aria-checked"),
		).toBe("true");
	});

	test("on desktop, a custom range is picked in a popover and applied", async () => {
		const { getByRole, getByText, onchange, baseElement } = mount(true);
		await fireEvent.click(getByRole("button", { name: "Custom" }));
		await tick();
		expect(getByText("Custom range")).toBeTruthy();
		const dayButton = (date: string) =>
			baseElement.querySelector(
				`[data-bits-day][data-value="${date}"]:not([data-outside-month])`,
			) as HTMLElement;
		await fireEvent.click(dayButton("2026-10-03"));
		await tick();
		expect(
			(getByRole("button", { name: "Apply" }) as HTMLButtonElement).disabled,
		).toBe(true);
		await fireEvent.click(dayButton("2026-10-06"));
		await tick();
		await fireEvent.click(getByRole("button", { name: "Apply" }));
		await tick();
		const change = lastChange(onchange);
		expect(change.preset).toBe("custom");
		expect(change.start).toEqual(new Date(2026, 9, 3));
		expect(change.end).toEqual(new Date(new Date(2026, 9, 7).getTime() - 1));
		expect(
			getByRole("radio", { name: "7 days" }).getAttribute("aria-checked"),
		).toBe("false");
		expect(getByRole("button", { name: /Oct 3/ })).toBeTruthy();
	});

	test("on a phone, the custom range opens in a drawer, applies, and cancels without a change", async () => {
		const { getByRole, onchange } = mount(false);
		await fireEvent.click(getByRole("button", { name: "Custom" }));
		await tick();
		expect(getByRole("dialog")).toBeTruthy();
		await fireEvent.click(getByRole("button", { name: "Apply" }));
		await tick();
		const change = lastChange(onchange);
		expect(change.preset).toBe("custom");
		expect(change.start).toEqual(new Date(2026, 9, 10));
		expect(change.end).toEqual(new Date(new Date(2026, 9, 18).getTime() - 1));
		await fireEvent.click(getByRole("button", { name: /Oct 10/ }));
		await tick();
		await fireEvent.click(getByRole("button", { name: "Cancel" }));
		await tick();
		expect(onchange).toHaveBeenCalledTimes(1);
	});

	test("messages override the English defaults", () => {
		const { getByRole } = mount(true, {
			messages: { label: "Période", custom: "Personnalisé" },
		});
		expect(getByRole("group", { name: "Période" })).toBeTruthy();
		expect(getByRole("button", { name: "Personnalisé" })).toBeTruthy();
	});
});
