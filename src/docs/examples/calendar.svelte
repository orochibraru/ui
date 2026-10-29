<script lang="ts">
	import {
		type DateValue,
		getLocalTimeZone,
		today,
	} from "@internationalized/date";

	import { Calendar } from "#lib/components/ui/calendar/index.js";

	let dueDate = $state<DateValue | undefined>(today(getLocalTimeZone()));
</script>

<div class="flex flex-wrap items-start gap-6">
	<Calendar type="single" bind:value={dueDate} class="rounded-lg border" />
	<Calendar
		type="single"
		captionLayout="dropdown"
		minValue={today(getLocalTimeZone())}
		class="rounded-lg border"
	/>
	<p class="text-muted-foreground text-sm">
		Due on {dueDate?.toDate(getLocalTimeZone()).toLocaleDateString() ?? "—"}
	</p>
</div>
