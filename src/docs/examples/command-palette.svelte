<script lang="ts">
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import HouseIcon from "@lucide/svelte/icons/house";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import SunMoonIcon from "@lucide/svelte/icons/sun-moon";
	import UserPlusIcon from "@lucide/svelte/icons/user-plus";
	import UsersIcon from "@lucide/svelte/icons/users";
	import { toggleMode } from "mode-watcher";
	import { toast } from "svelte-sonner";

	import CommandPalette, {
		type CommandGroup,
	} from "#lib/components/blocks/command-palette.svelte";

	const groups: CommandGroup[] = [
		{
			heading: "Navigation",
			items: [
				{ label: "Home", href: "#home", icon: HouseIcon },
				{
					label: "Team",
					href: "#team",
					icon: UsersIcon,
					description: "Members and roles",
				},
				{
					label: "Settings",
					href: "#settings",
					icon: SettingsIcon,
					keywords: ["preferences", "account"],
				},
			],
		},
		{
			heading: "Actions",
			items: [
				{
					label: "New document",
					icon: FileTextIcon,
					shortcut: "⌘N",
					onSelect: () => toast.success("Document created."),
				},
				{
					label: "Invite member",
					icon: UserPlusIcon,
					shortcut: "⌘I",
					onSelect: () => toast.success("Invite sent."),
				},
				{
					label: "Toggle theme",
					icon: SunMoonIcon,
					shortcut: "⌘D",
					keywords: ["dark", "light", "mode"],
					onSelect: toggleMode,
				},
			],
		},
	];
</script>

<CommandPalette {groups} />
