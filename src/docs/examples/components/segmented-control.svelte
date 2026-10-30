<script lang="ts">
	import EyeIcon from "@lucide/svelte/icons/eye";
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import ShieldIcon from "@lucide/svelte/icons/shield";

	import SegmentedControl from "#lib/components/kit/segmented-control.svelte";

	let role = $state("editor");
	let period = $state("week");
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
	<SegmentedControl
		label="Role"
		name="role"
		description="Admins can invite and remove members."
		options={[
			{ value: "viewer", label: "Viewer", icon: EyeIcon },
			{ value: "editor", label: "Editor", icon: PencilIcon },
			{ value: "admin", label: "Admin", icon: ShieldIcon },
		]}
		bind:value={role}
	/>
	<SegmentedControl
		label="Period"
		name="period"
		options={[
			{ value: "day", label: "Day" },
			{ value: "week", label: "Week" },
			{ value: "month", label: "Month" },
		]}
		bind:value={period}
	/>
</div>
