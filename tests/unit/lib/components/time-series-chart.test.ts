import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	test,
} from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { flushSync } from "svelte";

import TimeSeriesChart from "#lib/components/blocks/time-series-chart.svelte";
import {
	areaPath,
	barPath,
	columnsOf,
	medianSpacing,
	nearestIndex,
	niceStep,
	niceTicks,
	scaleLinear,
	segmentsOf,
	type TimeSeries,
	valueExtent,
} from "#lib/components/blocks/time-series-chart/scale.js";
import {
	formatTick,
	timeTicks,
} from "#lib/components/blocks/time-series-chart/time.js";

const days = Array.from(
	{ length: 5 },
	(_, index) => new Date(2026, 9, 1 + index),
);

const visitors: TimeSeries = {
	name: "Visitors",
	points: days.map((at, index) => ({
		at,
		value: [12, 18, null, 30, 24][index] ?? null,
	})),
};
const signUps: TimeSeries = {
	name: "Sign-ups",
	points: days.map((at, index) => ({ at, value: index + 1 })),
};

describe("scale helpers", () => {
	test("nice steps and ticks always include zero and cover the data", () => {
		expect(niceStep(100, 5)).toBe(20);
		expect(niceStep(0.7, 4)).toBe(0.2);
		expect(niceTicks(3, 87, 5)).toEqual([0, 20, 40, 60, 80, 100]);
		expect(niceTicks(-12, 30, 4)).toEqual([-20, 0, 20, 40]);
		expect(niceTicks(0, 0, 4)).toEqual([0, 0.5, 1]);
		expect(niceTicks(0.1, 0.3, 3)).toEqual([0, 0.1, 0.2, 0.3]);
	});

	test("a linear scale maps a domain onto a range, centering a flat domain", () => {
		const y = scaleLinear([0, 100], [200, 0]);
		expect(y(0)).toBe(200);
		expect(y(25)).toBe(150);
		expect(scaleLinear([5, 5], [0, 100])(5)).toBe(50);
	});

	test("columns, extent, spacing and the nearest column", () => {
		const columns = columnsOf([visitors, signUps]);
		expect(columns).toHaveLength(5);
		expect(valueExtent([visitors, signUps])).toEqual([1, 30]);
		expect(
			valueExtent([
				{ name: "Empty", points: [{ at: days[0] as Date, value: null }] },
			]),
		).toBeNull();
		expect(medianSpacing(columns)).toBe(86_400_000);
		expect(nearestIndex(columns, (columns[1] ?? 0) + 3_600_000)).toBe(1);
		expect(nearestIndex(columns, (columns[1] ?? 0) + 80_000_000)).toBe(2);
		expect(nearestIndex(columns, 0)).toBe(0);
	});

	test("null values split a series into separate segments", () => {
		const segments = segmentsOf(visitors.points);
		expect(
			segments.map((segment) => segment.map((point) => point.value)),
		).toEqual([
			[12, 18],
			[30, 24],
		]);
		expect(segmentsOf([{ at: days[0] as Date, value: null }])).toEqual([]);
	});

	test("paths close areas on the baseline and round only the data end of bars", () => {
		expect(
			areaPath(
				[
					{ x: 0, y: 10 },
					{ x: 10, y: 5 },
				],
				20,
			),
		).toBe("M0.0,10.0L10.0,5.0L10.0,20.0L0.0,20.0Z");
		expect(areaPath([], 20)).toBe("");
		expect(barPath(0, 10, 20, 100)).toBe(
			"M0,100V24A4,4 0 0 1 4,20H6A4,4 0 0 1 10,24V100Z",
		);
		expect(barPath(0, 10, 120, 100)).toBe(
			"M0,100V116A4,4 0 0 0 4,120H6A4,4 0 0 0 10,116V100Z",
		);
		expect(barPath(0, 10, 100, 100)).toBe("");
	});

	test("time ticks adapt their unit to the span", () => {
		const start = new Date(2026, 9, 1);
		const hours = timeTicks(start, new Date(2026, 9, 2), 6);
		expect(hours.unit).toBe("hour");
		expect(hours.ticks.map((tick) => tick.getHours())).toEqual([
			0, 6, 12, 18, 0,
		]);
		const month = timeTicks(start, new Date(2026, 9, 31), 6);
		expect(month.unit).toBe("day");
		expect(month.ticks.length).toBeLessThanOrEqual(6);
		const year = timeTicks(start, new Date(2027, 8, 30), 6);
		expect(year.unit).toBe("month");
		expect(year.ticks.every((tick) => tick.getDate() === 1)).toBe(true);
		expect(year.ticks.map((tick) => tick.getMonth())).toEqual([9, 0, 3, 6]);
		expect(timeTicks(start, new Date(2026, 9, 1, 0, 50), 6).unit).toBe(
			"minute",
		);
		expect(timeTicks(start, new Date(2126, 0, 1), 6).unit).toBe("year");
	});

	test("tick labels use the unit, and midnight shows the day", () => {
		const formatDay = new Intl.DateTimeFormat(undefined, {
			day: "numeric",
			month: "short",
		});
		expect(formatTick(new Date(2026, 9, 3), "hour")).toBe(
			formatDay.format(new Date(2026, 9, 3)),
		);
		expect(formatTick(new Date(2026, 9, 3), "day")).toBe(
			formatDay.format(new Date(2026, 9, 3)),
		);
		expect(formatTick(new Date(2027, 0, 1), "month")).toContain("2027");
		expect(formatTick(new Date(2027, 0, 1), "year")).toBe("2027");
	});
});

describe("TimeSeriesChart", () => {
	const descriptor = Object.getOwnPropertyDescriptor(
		HTMLElement.prototype,
		"clientWidth",
	);

	beforeAll(() => {
		Object.defineProperty(HTMLElement.prototype, "clientWidth", {
			configurable: true,
			get: () => 640,
		});
	});

	afterAll(() => {
		if (descriptor) {
			Object.defineProperty(HTMLElement.prototype, "clientWidth", descriptor);
		}
	});

	afterEach(() => cleanup());

	function mount(props: Record<string, unknown>) {
		const result = render(TimeSeriesChart, {
			title: "Traffic",
			series: [visitors, signUps],
			...props,
		});
		flushSync();
		return result;
	}

	test("draws one path per unbroken run, a legend and a summary", () => {
		const { container, getByRole, getByText } = mount({});
		const lines = container.querySelectorAll("path[data-segment]");
		expect(lines).toHaveLength(3);
		expect(getByText("Visitors", { selector: "li" })).toBeTruthy();
		const image = getByRole("img");
		expect(image.getAttribute("aria-label")).toContain("Traffic, from");
		expect(image.getAttribute("aria-label")).toContain(
			"Visitors: low 12, high 30, latest 24.",
		);
		expect(container.querySelectorAll("table tbody tr")).toHaveLength(5);
	});

	test("arrow keys move the readout across the columns", async () => {
		const { container, getByRole } = mount({});
		const slider = getByRole("slider");
		await fireEvent.focus(slider);
		expect(slider.getAttribute("aria-valuenow")).toBe("4");
		expect(container.querySelector("[data-readout]")?.textContent).toContain(
			"24",
		);
		await fireEvent.keyDown(slider, { key: "ArrowLeft" });
		await fireEvent.keyDown(slider, { key: "ArrowLeft" });
		expect(slider.getAttribute("aria-valuenow")).toBe("2");
		expect(slider.getAttribute("aria-valuetext")).toContain("Visitors No data");
		expect(slider.getAttribute("aria-valuetext")).toContain("Sign-ups 3");
		await fireEvent.keyDown(slider, { key: "Home" });
		expect(slider.getAttribute("aria-valuenow")).toBe("0");
		await fireEvent.keyDown(slider, { key: "ArrowLeft" });
		expect(slider.getAttribute("aria-valuenow")).toBe("0");
		await fireEvent.keyDown(slider, { key: "Enter" });
		await fireEvent.blur(slider);
		expect(container.querySelector("[data-readout]")).toBeNull();
	});

	test("a pointer shows the readout, above the chart on touch", async () => {
		const { container, getByRole } = mount({});
		const slider = getByRole("slider");
		await fireEvent.pointerMove(slider, { clientX: 0, pointerType: "mouse" });
		const readout = container.querySelector("[data-readout]");
		expect(readout?.className).toContain("top-0");
		await fireEvent.pointerLeave(slider);
		expect(container.querySelector("[data-readout]")).toBeNull();
		await fireEvent.pointerDown(slider, { clientX: 0, pointerType: "touch" });
		expect(container.querySelector("[data-readout]")?.className).toContain(
			"bottom-full",
		);
		await fireEvent.pointerCancel(slider);
		expect(container.querySelector("[data-readout]")).toBeNull();
	});

	test("bars render one mark per value, and the table toggles into view", async () => {
		const { container, getByRole } = mount({
			kind: "bar",
			series: [visitors],
			format: (value: number) => `${value} visits`,
		});
		expect(container.querySelectorAll("svg g path")).toHaveLength(4);
		expect(container.textContent).toContain("Peak 30 visits");
		const toggle = getByRole("button", { name: "Show data table" });
		await fireEvent.click(toggle);
		expect(toggle.getAttribute("aria-expanded")).toBe("true");
		expect(toggle.textContent).toBe("Hide data table");
	});

	test("shows the empty state when there's nothing to plot", () => {
		const { getByText, queryByRole } = mount({
			series: [{ name: "Visitors", points: [{ at: days[0], value: null }] }],
		});
		expect(getByText("No data in this range yet.")).toBeTruthy();
		expect(queryByRole("img")).toBeNull();
	});

	test("messages override the English defaults", async () => {
		const { getByRole, getByText } = mount({
			kind: "area",
			messages: {
				showTable: "Voir le tableau",
				noValue: "Aucune donnée",
				summary: (title: string) => `${title} en résumé.`,
			},
		});
		expect(getByText("Voir le tableau")).toBeTruthy();
		expect(getByRole("img").getAttribute("aria-label")).toContain(
			"Traffic en résumé.",
		);
		const slider = getByRole("slider");
		await fireEvent.focus(slider);
		await fireEvent.keyDown(slider, { key: "End" });
		await fireEvent.keyDown(slider, { key: "ArrowLeft" });
		await fireEvent.keyDown(slider, { key: "ArrowLeft" });
		expect(slider.getAttribute("aria-valuetext")).toContain(
			"Visitors Aucune donnée",
		);
	});
});
