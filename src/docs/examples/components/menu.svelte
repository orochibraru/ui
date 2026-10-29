<script lang="ts">
	import CopyIcon from "@lucide/svelte/icons/copy";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	import Menu from "#lib/components/kit/menu.svelte";
	import { Button } from "#lib/components/ui/button/index.js";

	let lastAction = $state("Nothing yet");
</script>

<div class="grid gap-4">
	<div
		class="bg-card flex w-full items-center justify-between gap-3 rounded-xl border p-3 pl-4"
	>
		<div class="min-w-0">
			<p class="truncate font-medium">Website redesign</p>
			<p class="text-muted-foreground text-sm">Updated 2 hours ago</p>
		</div>
		<Menu
			title="Website redesign"
			items={[
				{ label: "Open", icon: ExternalLinkIcon, href: "#open" },
				{
					label: "Rename",
					icon: PencilIcon,
					shortcut: "R",
					onSelect: () => (lastAction = "Rename"),
				},
				{
					label: "Duplicate",
					icon: CopyIcon,
					shortcut: "⌘D",
					onSelect: () => (lastAction = "Duplicate"),
				},
				{ label: "Archive", disabled: true },
				"separator",
				{
					label: "Delete",
					icon: Trash2Icon,
					destructive: true,
					onSelect: () => (lastAction = "Delete"),
				},
			]}
		/>
	</div>
	<div class="flex flex-wrap items-center gap-3">
		<Menu
			items={[
				{ label: "Members", href: "#members" },
				{ label: "Settings", href: "#settings" },
			]}
		>
			{#snippet trigger({ props })}
				<Button {...props} variant="outline" class="h-11 rounded-xl md:h-9">
					Team
				</Button>
			{/snippet}
		</Menu>
		<p class="text-muted-foreground text-sm">Last action: {lastAction}</p>
	</div>
</div>
