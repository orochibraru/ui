<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import HouseIcon from "@lucide/svelte/icons/house";
	import PlugIcon from "@lucide/svelte/icons/plug";
	import SunMoonIcon from "@lucide/svelte/icons/sun-moon";
	import { toggleMode } from "mode-watcher";
	import { toast } from "svelte-sonner";

	import CommandPalette, {
		type CommandGroup,
	} from "#lib/components/blocks/command-palette.svelte";

	import { mcpServer } from "./mcp-install.js";
	import { siteGroups as groups } from "./registry.js";

	let { open = $bindable(false) }: { open?: boolean } = $props();

	function copyMcpCommand() {
		toast.promise(navigator.clipboard.writeText(mcpServer.claudeCode), {
			loading: "Copying",
			success: "Claude Code command copied.",
			error: "Couldn't copy.",
		});
	}

	const searchGroups: CommandGroup[] = [
		...Object.entries(groups).map(([group, { label, docs }]) => ({
			heading: label,
			items: docs.map((doc) => ({
				label: doc.name,
				href: resolve("/[group]/[slug]", { group, slug: doc.slug }),
				icon: doc.icon,
				description: doc.category,
				keywords: [doc.slug, doc.category, doc.description],
			})),
		})),
		{
			heading: "Actions",
			items: [
				{ label: "Home", href: resolve("/"), icon: HouseIcon },
				{ label: "Toggle theme", onSelect: toggleMode, icon: SunMoonIcon },
				{
					label: "Copy the MCP server command",
					onSelect: copyMcpCommand,
					icon: PlugIcon,
					keywords: ["claude", "ai", "install"],
				},
				{
					label: "Open llms.txt",
					onSelect: () => window.open("/llms.txt", "_blank", "noopener"),
					icon: FileTextIcon,
					keywords: ["ai", "markdown"],
				},
			],
		},
	];
</script>

<CommandPalette
	bind:open
	groups={searchGroups}
	trigger={false}
	shortcut={!page.url.pathname.endsWith("/command-palette")}
	placeholder="Search components…"
	messages={{
		title: "Search the docs",
		description: "Find a block, primitive or module",
	}}
/>
