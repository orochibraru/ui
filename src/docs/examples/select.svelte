<script lang="ts">
	import * as Select from "#lib/components/ui/select/index.js";

	const roles = [
		{ value: "viewer", label: "Viewer" },
		{ value: "editor", label: "Editor" },
		{ value: "admin", label: "Admin" },
		{ value: "owner", label: "Owner" },
	];

	let role = $state("");
	const label = $derived(
		roles.find((r) => r.value === role)?.label ?? "Pick a role",
	);
</script>

<Select.Root type="single" bind:value={role}>
	<Select.Trigger class="w-56">{label}</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Roles</Select.Label>
			{#each roles as r (r.value)}
				<Select.Item value={r.value} label={r.label}>{r.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
