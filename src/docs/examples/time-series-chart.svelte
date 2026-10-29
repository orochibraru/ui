<script lang="ts">
	import TimeSeriesChart, {
		type TimeSeries,
	} from "#lib/components/blocks/time-series-chart.svelte";

	const days = Array.from(
		{ length: 30 },
		(_, index) => new Date(2026, 8, 1 + index),
	);

	function wave(index: number, base: number, swing: number) {
		const weekend = [0, 6].includes(days[index]?.getDay() ?? 1) ? 0.7 : 1;
		const ripple = ((index * 37) % 11) / 11 - 0.5;
		return Math.round(
			(base + swing * Math.sin(index / 4) + (swing / 2) * ripple) * weekend,
		);
	}

	const traffic: TimeSeries[] = [
		{
			name: "Visitors",
			points: days.map((at, index) => ({
				at,
				value: wave(index, 420 + index * 4, 60),
			})),
		},
		{
			name: "Sign-ups",
			points: days.map((at, index) => ({
				at,
				value: index === 17 || index === 18 ? null : wave(index, 110, 30),
			})),
		},
	];

	const uploads: TimeSeries[] = [
		{
			name: "Uploads",
			points: days.map((at, index) => ({
				at,
				value: wave(index, 64, 18),
			})),
		},
	];
</script>

<div class="grid w-full gap-10">
	<TimeSeriesChart
		title="Visitors and sign-ups"
		description="September, per day. Sign-ups weren't tracked on the 18th and 19th."
		series={traffic}
	/>
	<TimeSeriesChart
		title="Daily uploads"
		kind="bar"
		height={200}
		series={uploads}
	/>
</div>
