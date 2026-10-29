<script lang="ts">
	import FolderIcon from "@lucide/svelte/icons/folder";
	import HardDriveIcon from "@lucide/svelte/icons/hard-drive";
	import ListTodoIcon from "@lucide/svelte/icons/list-todo";
	import UsersIcon from "@lucide/svelte/icons/users";

	import StatCard from "#lib/components/blocks/stat-card.svelte";
</script>

<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard label="Projects" value={12} hint="This month" icon={FolderIcon} />
	<StatCard
		label="Active members"
		value={48}
		icon={UsersIcon}
		tone="positive"
	/>
	<StatCard
		label="Storage used"
		value="86 %"
		icon={HardDriveIcon}
		tone="warning"
	/>
	<StatCard label="Open tasks" value={7} href="#" icon={ListTodoIcon} />
</div>
