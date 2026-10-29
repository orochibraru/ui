<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import LayoutGridIcon from "@lucide/svelte/icons/layout-grid";
	import ListIcon from "@lucide/svelte/icons/list";

	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";

	let view = $state("list");
	let statuses = $state(["pending"]);
</script>

<div class="flex flex-wrap items-center gap-4">
	<ToggleGroup.Root type="single" bind:value={view} variant="outline">
		<ToggleGroup.Item value="list" aria-label="List view">
			<ListIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="grid" aria-label="Grid view">
			<LayoutGridIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="calendar" aria-label="Calendar view">
			<CalendarIcon />
		</ToggleGroup.Item>
	</ToggleGroup.Root>
	<ToggleGroup.Root type="multiple" bind:value={statuses} spacing={1}>
		<ToggleGroup.Item value="paid">Paid</ToggleGroup.Item>
		<ToggleGroup.Item value="pending">Pending</ToggleGroup.Item>
		<ToggleGroup.Item value="overdue">Overdue</ToggleGroup.Item>
	</ToggleGroup.Root>
</div>
