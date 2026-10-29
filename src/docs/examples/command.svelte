<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import SearchIcon from "@lucide/svelte/icons/search";
	import SettingsIcon from "@lucide/svelte/icons/settings";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Command from "#lib/components/ui/command/index.js";

	let open = $state(false);
</script>

<div class="grid gap-4">
	<Command.Root class="rounded-lg border">
		<Command.Input placeholder="Search projects and documents..." />
		<Command.List>
			<Command.Empty>No results.</Command.Empty>
			<Command.Group heading="Projects">
				<Command.Item><FolderIcon /> Website redesign</Command.Item>
				<Command.Item><FolderIcon /> Mobile app</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Documents">
				<Command.Item><FileTextIcon /> Quarterly report</Command.Item>
				<Command.Item><FileTextIcon /> Meeting notes</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Root>

	<Button variant="outline" class="w-fit" onclick={() => (open = true)}>
		<SearchIcon /> Open command palette
	</Button>
	<Command.Dialog bind:open>
		<Command.Input placeholder="Type a command..." />
		<Command.List>
			<Command.Empty>No results.</Command.Empty>
			<Command.Group heading="Actions">
				<Command.Item onSelect={() => (open = false)}>
					<PlusIcon /> New document
					<Command.Shortcut>⌘N</Command.Shortcut>
				</Command.Item>
				<Command.Item onSelect={() => (open = false)}>
					<CalendarIcon /> Schedule a meeting
				</Command.Item>
				<Command.Item onSelect={() => (open = false)}>
					<SettingsIcon /> Settings
					<Command.Shortcut>⌘,</Command.Shortcut>
				</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Dialog>
</div>
