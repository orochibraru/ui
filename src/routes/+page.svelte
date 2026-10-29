<script lang="ts">
	import { resolve } from "$app/paths";

	import AccentToggle from "#lib/components/blocks/accent-toggle.svelte";
	import StatCard from "#lib/components/blocks/stat-card.svelte";
	import ThemeToggle from "#lib/components/blocks/theme-toggle.svelte";
	import { setPageTitle } from "#lib/page-title.svelte.js";

	import CodeBlock from "../docs/code-block.svelte";
	import { groups, sections } from "../docs/registry.js";

	const { data } = $props();

	setPageTitle("@orochibraru/ui");
</script>

<div class="grid gap-8">
	<p class="text-muted-foreground text-lg">
		Svelte 5 components and the theme shared by OpenCount, LocalAssistant,
		Homerun, Sergio's, Nuvio Web and Penombre. Every page shows the component
		live and the code that renders it.
	</p>

	<section
		class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
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

	<section class="grid gap-3">
		<h2 class="text-lg font-semibold">Appearance</h2>
		<div class="flex flex-wrap items-center gap-4">
			<AccentToggle />
			<ThemeToggle />
		</div>
	</section>

	<section class="grid gap-3">
		<h2 class="text-lg font-semibold">Install</h2>
		<CodeBlock name="Terminal" {...data.install} />
		<p class="text-muted-foreground text-sm">
			Import the theme right after Tailwind in the app's root stylesheet. It
			brings the tokens, the variants and an <code>@source</code> that makes Tailwind
			scan the package.
		</p>
		<CodeBlock name="app.css" {...data.stylesheet} />
	</section>

	<p class="text-muted-foreground text-sm">
		The tabbed-section pattern runs live in <a
			class="text-primary underline-offset-4 hover:underline"
			href={resolve("/section")}>a demo section</a
		>.
	</p>
</div>
