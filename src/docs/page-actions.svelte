<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import BotIcon from "@lucide/svelte/icons/bot";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import FileDownIcon from "@lucide/svelte/icons/file-down";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import MessageCircleMoreIcon from "@lucide/svelte/icons/message-circle-more";
	import PlugIcon from "@lucide/svelte/icons/plug";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { toast } from "svelte-sonner";

	import * as ButtonGroup from "#lib/components/ui/button-group/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";

	import type { Group } from "./catalog.js";
	import { mcpServer } from "./mcp-install.js";

	const { group, slug, name }: { group: Group; slug: string; name: string } =
		$props();

	const markdownHref = $derived(resolve("/[group]/[slug].md", { group, slug }));
	const markdownUrl = $derived(new URL(markdownHref, page.url.origin).href);
	const prompt = $derived(
		`Read ${markdownUrl} so you can help me use the ${name} component of @orochibraru/ui in my SvelteKit app.`,
	);

	function copyMarkdown() {
		const markdown = fetch(markdownHref).then(async (response) => {
			if (!response.ok) {
				throw new Error("Couldn't load the page's Markdown.");
			}
			return new Blob([await response.text()], { type: "text/plain" });
		});
		toast.promise(
			navigator.clipboard.write([
				new ClipboardItem({ "text/plain": markdown }),
			]),
			{
				loading: "Copying the page",
				success: "Page copied as Markdown.",
				error: "Couldn't copy the page.",
			},
		);
	}

	function copyText(text: string, success: string) {
		toast.promise(navigator.clipboard.writeText(text), {
			loading: "Copying",
			success,
			error: "Couldn't copy.",
		});
	}

	function exportPdf() {
		const root = document.documentElement;
		const dark = root.classList.contains("dark");
		root.classList.remove("dark");
		window.print();
		root.classList.toggle("dark", dark);
	}

	function open(url: string) {
		window.open(url, "_blank", "noopener");
	}
</script>

<ButtonGroup.Root class="print:hidden">
	<Button variant="outline" onclick={copyMarkdown}>
		<CopyIcon /> Copy page
	</Button>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="icon" aria-label="More">
					<ChevronDownIcon />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="w-64">
			<DropdownMenu.Group>
				<DropdownMenu.Item onSelect={() => open(markdownHref)}>
					<FileTextIcon /> View as Markdown
				</DropdownMenu.Item>
				<DropdownMenu.Item onSelect={exportPdf}>
					<FileDownIcon /> Export as PDF
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Label>Ask about this page</DropdownMenu.Label>
				<DropdownMenu.Item
					onSelect={() =>
						open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`)}
				>
					<BotIcon /> Open in Claude
				</DropdownMenu.Item>
				<DropdownMenu.Item
					onSelect={() =>
						open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`)}
				>
					<MessageCircleMoreIcon /> Open in ChatGPT
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Label>Connect the MCP server</DropdownMenu.Label>
				<DropdownMenu.Item onSelect={() => open(mcpServer.cursorUrl)}>
					<PlugIcon /> Add to Cursor
				</DropdownMenu.Item>
				<DropdownMenu.Item onSelect={() => open(mcpServer.vscodeUrl)}>
					<PlugIcon /> Add to VS Code
				</DropdownMenu.Item>
				<DropdownMenu.Item
					onSelect={() =>
						copyText(mcpServer.claudeCode, "Claude Code command copied.")}
				>
					<TerminalIcon /> Copy Claude Code command
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</ButtonGroup.Root>
