<script lang="ts">
	import TimeRangePicker, {
		type TimeRange,
	} from "#lib/components/blocks/time-range-picker.svelte";
	import TimeSeriesChart from "#lib/components/blocks/time-series-chart.svelte";

	const hour = 3_600_000;
	const day = 24 * hour;

	let range = $state<TimeRange>({
		preset: "7d",
		start: new Date(Date.now() - 7 * day),
		end: new Date(),
	});

	function buckets(start: Date, end: Date) {
		const span = end.getTime() - start.getTime();
		const unit = span <= 2 * day ? "hour" : span <= 100 * day ? "day" : "month";
		const cursor = new Date(start);
		cursor.setMinutes(0, 0, 0);
		if (unit !== "hour") {
			cursor.setHours(0);
		}
		if (unit === "month") {
			cursor.setDate(1);
		}
		const points: Date[] = [];
		while (cursor <= end) {
			points.push(new Date(cursor));
			if (unit === "hour") {
				cursor.setHours(cursor.getHours() + 1);
			} else if (unit === "day") {
				cursor.setDate(cursor.getDate() + 1);
			} else {
				cursor.setMonth(cursor.getMonth() + 1);
			}
		}
		return { unit, points };
	}

	function activeUsers(at: Date, unit: string) {
		if (unit === "hour") {
			return Math.round(
				60 + 45 * Math.sin(((at.getHours() - 9) / 24) * 2 * Math.PI),
			);
		}
		const index = Math.floor(at.getTime() / day);
		const ripple = ((index * 37) % 11) / 11;
		const daily = 900 + 160 * Math.sin(index / 6) + 120 * ripple;
		return Math.round(unit === "month" ? daily * 30 : daily);
	}

	const series = $derived.by(() => {
		const { unit, points } = buckets(range.start, range.end);
		return [
			{
				name: "Active users",
				points: points.map((at) => ({ at, value: activeUsers(at, unit) })),
			},
		];
	});
</script>

<div class="grid w-full gap-6">
	<TimeRangePicker bind:value={range} />
	<TimeSeriesChart title="Active users" kind="area" {series} />
</div>
