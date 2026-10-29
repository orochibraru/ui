<script lang="ts">
	import StatusBadge from "#lib/components/kit/status-badge.svelte";

	const statuses = ["running", "syncing", "paused", "failed", "draft"] as const;
</script>

<div class="flex flex-wrap gap-2">
	{#each statuses as status (status)}
		<StatusBadge
			{status}
			pulse={status === "syncing"}
			tones={{
				running: "positive",
				syncing: "info",
				paused: "warning",
				failed: "negative",
			}}
			labels={{
				running: "Running",
				syncing: "Syncing",
				paused: "Paused",
				failed: "Failed",
				draft: "Draft",
			}}
		/>
	{/each}
</div>
