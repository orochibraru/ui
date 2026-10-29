<script lang="ts">
	import { resolve } from "$app/paths";
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";

	import TabSection from "#lib/components/blocks/tab-section.svelte";
	import { usePageTitle } from "#lib/page-title.svelte.js";

	import { tabs } from "./tabs.js";

	const { children } = $props();

	const title = usePageTitle();
</script>

<main class="pt-safe-top grid gap-4 p-4 md:p-8">
	<header class="flex items-center gap-2">
		{#if title.backHref}
			<a
				href={title.backHref}
				aria-label="Back"
				class="hover:bg-muted -ml-2 flex size-11 items-center justify-center rounded-full"
			>
				<ChevronLeftIcon class="size-5" />
			</a>
		{/if}
		<h1 class="text-2xl font-bold">{title.current}</h1>
	</header>
	<TabSection
		title="Section"
		indexHref={resolve("/section")}
		backHref={resolve("/")}
		{tabs}
	>
		{@render children()}
	</TabSection>
</main>
