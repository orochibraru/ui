<script lang="ts">
	import FolderIcon from "@lucide/svelte/icons/folder";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UsersIcon from "@lucide/svelte/icons/users";

	import Tabs from "#lib/components/kit/tabs.svelte";

	let tab = $state("files");

	const panels: Record<string, string> = {
		files: "12 files, last edited this morning.",
		members: "5 members can edit this project.",
		activity: "No activity this week.",
		settings: "Visibility, integrations and danger zone.",
		archive: "Nothing archived.",
	};
</script>

<Tabs
	bind:value={tab}
	items={[
		{ value: "files", label: "Files", icon: FolderIcon, badge: 12 },
		{ value: "members", label: "Members", icon: UsersIcon, badge: 5 },
		{ value: "activity", label: "Activity" },
		{ value: "settings", label: "Settings", icon: SettingsIcon },
		{ value: "archive", label: "Archive", disabled: true },
	]}
>
	{#snippet children(value)}
		<p class="text-muted-foreground rounded-xl border p-4">{panels[value]}</p>
	{/snippet}
</Tabs>
