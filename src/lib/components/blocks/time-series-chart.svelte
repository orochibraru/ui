<script lang="ts" module>
	export type {
		TimePoint,
		TimeSeries,
	} from "#lib/components/blocks/time-series-chart/scale.js";
	export type { TimeSeriesChartMessages } from "#lib/components/blocks/time-series-chart/messages.js";

	export type TimeSeriesKind = "line" | "area" | "bar";
</script>

<script lang="ts">
	import DataTable from "#lib/components/blocks/time-series-chart/data-table.svelte";
	import Legend from "#lib/components/blocks/time-series-chart/legend.svelte";
	import Marks from "#lib/components/blocks/time-series-chart/marks.svelte";
	import {
		defaultMessages,
		type TimeSeriesChartMessages,
	} from "#lib/components/blocks/time-series-chart/messages.js";
	import Readout from "#lib/components/blocks/time-series-chart/readout.svelte";
	import {
		barPath,
		columnsOf,
		medianSpacing,
		nearestIndex,
		niceTicks,
		scaleLinear,
		segmentsOf,
		type TimeSeries,
		valueExtent,
		valueMap,
	} from "#lib/components/blocks/time-series-chart/scale.js";
	import {
		formatInstant,
		formatTick,
		timeTicks,
	} from "#lib/components/blocks/time-series-chart/time.js";
	import { cn } from "#lib/utils.js";

	interface Props {
		series: TimeSeries[];
		title: string;
		description?: string;
		kind?: TimeSeriesKind;
		format?: (value: number) => string;
		height?: number;
		messages?: Partial<TimeSeriesChartMessages>;
		class?: string;
	}

	const {
		series,
		title,
		description,
		kind = "line",
		format,
		height = 240,
		messages = {},
		class: className,
	}: Props = $props();

	const id = $props.id();
	const numberFormat = new Intl.NumberFormat();
	const compactFormat = new Intl.NumberFormat(undefined, {
		notation: "compact",
	});

	let width = $state(0);
	let activeIndex = $state<number | null>(null);
	let placement = $state<"floating" | "above">("floating");
	let tableVisible = $state(false);

	const text = $derived({ ...defaultMessages, ...messages });
	const formatValue = $derived(
		format ?? ((value: number) => numberFormat.format(value)),
	);
	const formatAxis = $derived(
		format ?? ((value: number) => compactFormat.format(value)),
	);
	const colors = $derived(
		series.map((_, index) =>
			index < 4 ? `var(--series-${index + 1})` : "var(--series-other)",
		),
	);

	const columns = $derived(columnsOf(series));
	const maps = $derived(series.map((entry) => valueMap(entry)));
	const extent = $derived(valueExtent(series));
	const spacing = $derived(medianSpacing(columns));
	const first = $derived(columns[0] ?? 0);
	const last = $derived(columns.at(-1) ?? 0);

	const top = 10;
	const bottom = 28;
	const plotHeight = $derived(Math.max(40, height - top - bottom));
	const yTicks = $derived(
		extent
			? niceTicks(
					extent[0],
					extent[1],
					Math.max(2, Math.floor(plotHeight / 44)),
				)
			: [0, 1],
	);
	const y = $derived(
		scaleLinear([yTicks[0] ?? 0, yTicks.at(-1) ?? 1], [top + plotHeight, top]),
	);
	const baseline = $derived(y(0));
	const left = $derived(
		Math.max(...yTicks.map((tick) => formatAxis(tick).length)) * 7 + 10,
	);

	const ends = $derived(
		series.map((entry) => {
			const segment = segmentsOf(entry.points).at(-1);
			const point = segment?.at(-1);
			return point && point.value !== null
				? { time: point.at.getTime(), value: point.value }
				: null;
		}),
	);
	const directLabels = $derived.by(() => {
		if (kind === "bar" || series.length > 4 || width < 360) {
			return false;
		}
		const heights = ends
			.filter((end) => end !== null)
			.map((end) => y(end.value))
			.sort((above, below) => above - below);
		return heights.every(
			(value, index) => index === 0 || value - (heights[index - 1] ?? 0) >= 14,
		);
	});
	const right = $derived(
		directLabels
			? Math.max(
					...ends.map((end) => (end ? formatValue(end.value).length : 0)),
				) *
					7 +
					16
			: 8,
	);

	const plotWidth = $derived(Math.max(0, width - left - right));
	const slot = $derived(plotWidth / Math.max(1, columns.length));
	const xRange = $derived<[number, number]>(
		kind === "bar"
			? [left + slot / 2, left + plotWidth - slot / 2]
			: [left, left + plotWidth],
	);
	const x = $derived(scaleLinear([first, last], xRange));
	const xTicks = $derived(
		timeTicks(
			new Date(first),
			new Date(last),
			Math.max(2, Math.floor(plotWidth / 84)),
		),
	);

	const lines = $derived(
		series.map((entry, index) => {
			const end = ends[index];
			return {
				color: colors[index] ?? "",
				segments: segmentsOf(entry.points).map((segment) =>
					segment.map((point) => ({
						x: x(point.at.getTime()),
						y: y(point.value ?? 0),
					})),
				),
				end: end
					? { x: x(end.time), y: y(end.value), label: formatValue(end.value) }
					: null,
			};
		}),
	);
	const bars = $derived.by(() => {
		if (kind !== "bar") {
			return [];
		}
		const count = Math.max(1, series.length);
		const gap = slot >= 4 ? 2 : 0;
		const group = Math.min(slot - gap, count * 24 + (count - 1) * gap);
		const barWidth = Math.max(0.5, (group - (count - 1) * gap) / count);
		return series.map((entry, index) => ({
			color: colors[index] ?? "",
			bars: entry.points
				.filter((point) => point.value !== null)
				.map((point) => {
					const column = point.at.getTime();
					const barLeft = x(column) - group / 2 + index * (barWidth + gap);
					return {
						column,
						path: barPath(barLeft, barWidth, y(point.value ?? 0), baseline),
					};
				}),
		}));
	});

	const activeColumn = $derived(
		activeIndex === null ? null : (columns[activeIndex] ?? null),
	);
	const activeRows = $derived(
		series.map((entry, index) => {
			const value =
				activeColumn === null ? null : (maps[index]?.get(activeColumn) ?? null);
			return {
				name: entry.name,
				color: colors[index] ?? "",
				raw: value,
				value: value === null ? text.noValue : formatValue(value),
			};
		}),
	);
	const activeDots = $derived(
		activeColumn === null || kind === "bar"
			? []
			: activeRows
					.filter((row) => row.raw !== null)
					.map((row) => ({
						x: x(activeColumn),
						y: y(row.raw ?? 0),
						color: row.color,
					})),
	);
	const activeLabel = $derived(
		activeColumn === null ? "" : formatInstant(new Date(activeColumn), spacing),
	);
	const valueText = $derived(
		activeColumn === null
			? text.keyboardHint
			: `${activeLabel}: ${activeRows.map((row) => `${row.name} ${row.value}`).join(", ")}`,
	);

	const summary = $derived.by(() => {
		if (!extent) {
			return title;
		}
		const parts = series.map((entry, index) => {
			const values = entry.points
				.map((point) => point.value)
				.filter((value) => value !== null);
			const end = ends[index];
			return values.length && end
				? text.seriesSummary(
						entry.name,
						formatValue(Math.min(...values)),
						formatValue(Math.max(...values)),
						formatValue(end.value),
					)
				: "";
		});
		return [
			text.summary(
				title,
				formatInstant(new Date(first), spacing),
				formatInstant(new Date(last), spacing),
			),
			...parts,
		]
			.filter(Boolean)
			.join(" ");
	});
	const headline = $derived.by(() => {
		const values = (series[0]?.points ?? [])
			.map((point) => point.value)
			.filter((value) => value !== null);
		if (series.length !== 1 || !values.length) {
			return "";
		}
		const average =
			values.reduce((total, value) => total + value, 0) / values.length;
		return `${text.peak} ${formatValue(Math.max(...values))} · ${text.average} ${formatValue(Math.round(average * 10) / 10)}`;
	});
	const tableRows = $derived(
		columns.map((time) => ({
			time,
			date: formatInstant(new Date(time), spacing),
			values: maps.map((map) => {
				const value = map.get(time) ?? null;
				return value === null ? text.noValue : formatValue(value);
			}),
		})),
	);

	function indexAt(event: PointerEvent): number {
		const target = event.currentTarget as HTMLElement;
		const offset = event.clientX - target.getBoundingClientRect().left + left;
		const [rangeStart, rangeEnd] = xRange;
		const ratio =
			rangeEnd === rangeStart
				? 0
				: (offset - rangeStart) / (rangeEnd - rangeStart);
		return nearestIndex(columns, first + ratio * (last - first));
	}

	function onpointer(event: PointerEvent) {
		placement = event.pointerType === "touch" ? "above" : "floating";
		activeIndex = indexAt(event);
	}

	function onkeydown(event: KeyboardEvent) {
		const current = activeIndex ?? columns.length - 1;
		const next = {
			ArrowLeft: current - 1,
			ArrowDown: current - 1,
			ArrowRight: current + 1,
			ArrowUp: current + 1,
			Home: 0,
			End: columns.length - 1,
		}[event.key];
		if (next === undefined) {
			return;
		}
		event.preventDefault();
		placement = "floating";
		activeIndex = Math.min(columns.length - 1, Math.max(0, next));
	}

	function onfocus() {
		if (activeIndex === null) {
			placement = "floating";
			activeIndex = columns.length - 1;
		}
	}
</script>

<figure class={cn("time-series-chart w-full min-w-0", className)}>
	<figcaption
		class="mb-3 flex flex-wrap items-baseline justify-between gap-x-4"
	>
		<span class="grid gap-0.5">
			<span class="text-sm font-medium">{title}</span>
			{#if description}
				<span class="text-muted-foreground text-sm">{description}</span>
			{/if}
		</span>
		{#if headline}
			<span class="text-muted-foreground text-xs tabular">{headline}</span>
		{/if}
	</figcaption>
	{#if !extent}
		<div
			class="text-muted-foreground flex items-center justify-center rounded-xl border border-dashed text-sm"
			style:height="{height}px"
		>
			{text.empty}
		</div>
	{:else}
		<div class="relative" style:height="{height}px" bind:clientWidth={width}>
			{#if width > 0}
				<svg
					{width}
					{height}
					viewBox="0 0 {width} {height}"
					role="img"
					aria-label={summary}
					class="block overflow-visible"
				>
					{#each yTicks as tick (tick)}
						{@const level = Math.round(y(tick)) + 0.5}
						<line
							x1={left}
							x2={left + plotWidth}
							y1={level}
							y2={level}
							class={tick === 0
								? "stroke-muted-foreground/40"
								: "stroke-border"}
						/>
						<text
							x={left - 8}
							y={level}
							text-anchor="end"
							dominant-baseline="middle"
							class="fill-muted-foreground text-[11px] tabular"
							>{formatAxis(tick)}</text
						>
					{/each}
					{#each xTicks.ticks as tick (tick.getTime())}
						{@const position = x(tick.getTime())}
						<text
							x={position}
							y={top + plotHeight + 18}
							text-anchor={position - left < 24
								? "start"
								: left + plotWidth - position < 24
									? "end"
									: "middle"}
							class="fill-muted-foreground text-[11px] tabular"
							>{formatTick(tick, xTicks.unit)}</text
						>
					{/each}
					{#if activeColumn !== null && kind !== "bar"}
						{@const position = Math.round(x(activeColumn)) + 0.5}
						<line
							x1={position}
							x2={position}
							y1={top}
							y2={top + plotHeight}
							class="stroke-muted-foreground/60"
						/>
					{/if}
					<Marks
						{kind}
						{lines}
						{bars}
						{baseline}
						{activeColumn}
						{activeDots}
						{directLabels}
					/>
				</svg>
				<div
					role="slider"
					tabindex="0"
					aria-label={title}
					aria-valuemin={0}
					aria-valuemax={Math.max(0, columns.length - 1)}
					aria-valuenow={activeIndex ?? Math.max(0, columns.length - 1)}
					aria-valuetext={valueText}
					class="focus-visible:ring-ring/50 absolute cursor-crosshair touch-pan-y rounded-md outline-none select-none focus-visible:ring-3"
					style:left="{left}px"
					style:top="{top}px"
					style:width="{plotWidth}px"
					style:height="{plotHeight}px"
					onpointerdown={onpointer}
					onpointermove={onpointer}
					onpointerleave={() => (activeIndex = null)}
					onpointercancel={() => (activeIndex = null)}
					{onkeydown}
					{onfocus}
					onblur={() => (activeIndex = null)}
				></div>
				{#if activeColumn !== null}
					<Readout
						label={activeLabel}
						rows={activeRows}
						{placement}
						x={x(activeColumn)}
						{width}
					/>
				{/if}
			{/if}
		</div>
		<div class="mt-3 flex flex-wrap items-center justify-between gap-2">
			{#if series.length > 1}
				<Legend
					entries={series.map((entry, index) => ({
						name: entry.name,
						color: colors[index] ?? "",
					}))}
					{kind}
				/>
			{:else}
				<span></span>
			{/if}
			<button
				type="button"
				aria-expanded={tableVisible}
				aria-controls="{id}-table"
				class="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 -mr-2 h-11 rounded-md px-2 text-xs outline-none focus-visible:ring-3 md:h-8"
				onclick={() => (tableVisible = !tableVisible)}
				>{tableVisible ? text.hideTable : text.showTable}</button
			>
		</div>
		<DataTable
			id="{id}-table"
			caption={title}
			dateHeading={text.date}
			names={series.map((entry) => entry.name)}
			rows={tableRows}
			visible={tableVisible}
		/>
	{/if}
</figure>

<style>
	.time-series-chart {
		--series-1: oklch(0.58 0.16 var(--hue));
		--series-2: oklch(0.75 0.16 calc(var(--hue) + 255));
		--series-3: oklch(0.5 0.16 calc(var(--hue) + 75));
		--series-4: oklch(0.69 0.16 calc(var(--hue) + 135));
		--series-other: var(--muted-foreground);
	}

	:global(.dark) .time-series-chart {
		--series-1: oklch(0.66 0.16 var(--hue));
		--series-2: oklch(0.66 0.16 calc(var(--hue) + 255));
		--series-3: oklch(0.5 0.16 calc(var(--hue) + 75));
		--series-4: oklch(0.66 0.16 calc(var(--hue) + 135));
	}
</style>
