<script lang="ts">
	import Switch from "#lib/components/kit/switch.svelte";

	let mentions = $state(true);
	let reminders = $state(false);
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
	<Switch
		label="Mentions"
		name="mentions"
		description="Notify me when someone mentions me."
		bind:checked={mentions}
	/>
	<Switch
		label="Reminders"
		name="reminders"
		description="A nudge the day before a due date."
		bind:checked={reminders}
	/>
	<Switch
		label="Read receipts"
		name="receipts"
		description="Managed by your administrator."
		checked
		disabled
	/>
</div>
