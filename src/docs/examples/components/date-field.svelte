<script lang="ts">
	import DateField from "#lib/components/kit/date-field.svelte";

	let start = $state("");
	let due = $state("2026-06-15");
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<DateField
		label="Start date"
		name="start"
		description="The first day of the project."
		bind:value={start}
	/>
	<DateField
		label="Due date"
		name="due"
		min="2026-01-01"
		max="2026-12-31"
		required
		bind:value={due}
	/>
	<DateField
		label="Review"
		name="review"
		error="Pick a date after the start."
	/>
	<DateField label="Created" value="2026-03-02" disabled />
</div>
