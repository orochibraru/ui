<script lang="ts">
	import {
		areaPath,
		linePath,
		type Position,
	} from "#lib/components/blocks/time-series-chart/scale.js";

	interface LineGeometry {
		color: string;
		segments: Position[][];
		end: (Position & { label: string }) | null;
	}

	interface BarGeometry {
		color: string;
		bars: { path: string; column: number }[];
	}

	interface Props {
		kind: "line" | "area" | "bar";
		lines: LineGeometry[];
		bars: BarGeometry[];
		baseline: number;
		activeColumn: number | null;
		activeDots: (Position & { color: string })[];
		directLabels: boolean;
	}

	const {
		kind,
		lines,
		bars,
		baseline,
		activeColumn,
		activeDots,
		directLabels,
	}: Props = $props();
</script>

{#if kind === "bar"}
	{#each bars as entry, seriesIndex (seriesIndex)}
		<g style:fill={entry.color}>
			{#each entry.bars as bar (bar.column)}
				<path
					d={bar.path}
					class="transition-opacity duration-150"
					opacity={activeColumn === null || activeColumn === bar.column
						? 1
						: 0.45}
				/>
			{/each}
		</g>
	{/each}
{:else}
	{#each lines as entry, seriesIndex (seriesIndex)}
		<g style:color={entry.color}>
			{#each entry.segments as segment, segmentIndex (segmentIndex)}
				{#if segment.length > 1}
					{#if kind === "area"}
						<path
							d={areaPath(segment, baseline)}
							fill="currentColor"
							fill-opacity="0.1"
						/>
					{/if}
					<path
						d={linePath(segment)}
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linejoin="round"
						stroke-linecap="round"
						data-segment
					/>
				{:else if segment[0]}
					<circle
						cx={segment[0].x}
						cy={segment[0].y}
						r="4"
						fill="currentColor"
						class="stroke-background"
						stroke-width="2"
						data-segment
					/>
				{/if}
			{/each}
			{#if entry.end}
				<circle
					cx={entry.end.x}
					cy={entry.end.y}
					r="4"
					fill="currentColor"
					class="stroke-background"
					stroke-width="2"
				/>
				{#if directLabels}
					<text
						x={entry.end.x + 9}
						y={entry.end.y}
						dominant-baseline="middle"
						class="fill-foreground text-[11px] font-medium tabular"
						>{entry.end.label}</text
					>
				{/if}
			{/if}
		</g>
	{/each}
{/if}
{#each activeDots as dot, index (index)}
	<circle
		cx={dot.x}
		cy={dot.y}
		r="5"
		style:fill={dot.color}
		class="stroke-background pointer-events-none"
		stroke-width="2"
	/>
{/each}
