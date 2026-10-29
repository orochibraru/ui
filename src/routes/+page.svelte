<script lang="ts">
	import { resolve } from "$app/paths";

	import AccentToggle from "#lib/components/blocks/accent-toggle.svelte";
	import StatCard from "#lib/components/blocks/stat-card.svelte";
	import ThemeToggle from "#lib/components/blocks/theme-toggle.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
	import { setPageTitle } from "#lib/page-title.svelte.js";

	import CodeBlock from "../docs/code-block.svelte";
	import { mcpServer } from "../docs/mcp-install.js";
	import { groups, sections, shadcnHref } from "../docs/registry.js";

	const { data } = $props();

	setPageTitle("@orochibraru/ui");
</script>

<div class="grid grid-cols-1 gap-8">
	<p class="text-muted-foreground text-lg">
		Svelte 5 components and the theme shared by OpenCount, LocalAssistant,
		Homerun, Sergio's, Nuvio Web and Penombre. Every page shows the component
		live and the code that renders it.
	</p>

	<section
		class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
		aria-label="Sections"
	>
		{#each sections.slice(1) as section (section.href)}
			{@const group = groups[section.href.slice(1) as keyof typeof groups]}
			<StatCard
				label={section.label}
				value={group.docs.length}
				hint={group.description}
				href={section.href}
				icon={section.icon}
			/>
		{/each}
	</section>

	<section class="grid grid-cols-1 gap-3">
		<h2 class="text-lg font-semibold">Appearance</h2>
		<div class="flex flex-wrap items-center gap-4">
			<AccentToggle />
			<ThemeToggle />
		</div>
	</section>

	<section class="grid grid-cols-1 gap-3">
		<h2 class="text-lg font-semibold">Install</h2>
		<CodeBlock name="Terminal" {...data.install} />
		<p class="text-muted-foreground text-sm">
			Import the theme right after Tailwind in the app's root stylesheet. It
			brings the tokens, the variants and an <code>@source</code> that makes Tailwind
			scan the package.
		</p>
		<CodeBlock name="app.css" {...data.stylesheet} />
	</section>

	<section class="grid grid-cols-1 gap-3">
		<h2 class="text-lg font-semibold">Use with AI</h2>
		<p class="text-muted-foreground text-sm">
			The package ships an MCP server with every component's docs and code: your
			editor's assistant can list, search and read them. Every page also has a
			<strong>Copy page</strong> button for its Markdown.
		</p>
		<div class="flex flex-wrap gap-2">
			<Button variant="outline" href={mcpServer.cursorUrl}>Add to Cursor</Button
			>
			<Button variant="outline" href={mcpServer.vscodeUrl}
				>Add to VS Code</Button
			>
		</div>
		<CodeBlock name="Claude Code" {...data.claudeCode} />
		<CodeBlock name="mcp.json" {...data.mcpJson} />
		<p class="text-muted-foreground text-sm">
			Without installing anything: <a
				class="text-primary underline-offset-4 hover:underline"
				href="/llms.txt">llms.txt</a
			>,
			<a
				class="text-primary underline-offset-4 hover:underline"
				href="/llms-full.txt">llms-full.txt</a
			>
			and the hosted MCP endpoint at <code>/mcp</code>.
		</p>
	</section>

	<section class="grid grid-cols-1 gap-3">
		<h2 class="text-lg font-semibold">Primitives</h2>
		<p class="text-muted-foreground max-w-prose text-sm">
			The package also exports shadcn-svelte's components as the apps customised
			them, under <code>@orochibraru/ui/&lt;name&gt;</code>. They're documented
			on
			<a
				class="text-primary underline-offset-4 hover:underline"
				href={shadcnHref()}>shadcn-svelte</a
			>; the MCP server and llms.txt still carry their usage code.
		</p>
	</section>

	<p class="text-muted-foreground text-sm">
		<a
			class="text-primary underline-offset-4 hover:underline"
			href={resolve("/privacy")}>Privacy and credits</a
		>. The tabbed-section pattern runs live in
		<a
			class="text-primary underline-offset-4 hover:underline"
			href={resolve("/section")}>a demo section</a
		>.
	</p>
</div>
