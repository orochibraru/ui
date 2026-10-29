<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import SearchIcon from "@lucide/svelte/icons/search";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UsersIcon from "@lucide/svelte/icons/users";
	import WalletIcon from "@lucide/svelte/icons/wallet";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Command from "#lib/components/ui/command/index.js";

	let open = $state(false);
</script>

<div class="grid gap-4">
	<Command.Root class="rounded-lg border">
		<Command.Input placeholder="Search groups and expenses..." />
		<Command.List>
			<Command.Empty>No results.</Command.Empty>
			<Command.Group heading="Groups">
				<Command.Item><UsersIcon /> Lisbon trip</Command.Item>
				<Command.Item><UsersIcon /> Flatmates</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Expenses">
				<Command.Item><WalletIcon /> Dinner at Ramiro</Command.Item>
				<Command.Item><WalletIcon /> Airbnb deposit</Command.Item>
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
					<PlusIcon /> Add expense
					<Command.Shortcut>⌘N</Command.Shortcut>
				</Command.Item>
				<Command.Item onSelect={() => (open = false)}>
					<CalendarIcon /> Schedule a payment
				</Command.Item>
				<Command.Item onSelect={() => (open = false)}>
					<SettingsIcon /> Settings
					<Command.Shortcut>⌘,</Command.Shortcut>
				</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Dialog>
</div>
