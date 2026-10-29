<script lang="ts">
	import {
		type DateValue,
		getLocalTimeZone,
		today,
	} from "@internationalized/date";

	import { RangeCalendar } from "#lib/components/ui/range-calendar/index.js";

	const start = today(getLocalTimeZone());
	let value = $state<{
		start: DateValue | undefined;
		end: DateValue | undefined;
	}>({
		start,
		end: start.add({ days: 6 }),
	});
</script>

<div class="flex flex-wrap items-start gap-6">
	<RangeCalendar bind:value numberOfMonths={2} class="rounded-md border" />
	<p class="text-muted-foreground text-sm">
		Trip: {value.start?.toString() ?? "…"} → {value.end?.toString() ?? "…"}
	</p>
</div>
