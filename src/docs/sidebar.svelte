<script lang="ts">
	import { resolve } from "$app/paths";
	import SearchIcon from "@lucide/svelte/icons/search";
	import { onMount } from "svelte";

	import ThemeToggle from "#lib/components/blocks/theme-toggle.svelte";

	import DocsNav from "./docs-nav.svelte";

	const { onsearch }: { onsearch: () => void } = $props();

	let shortcut = $state("Ctrl K");

	onMount(() => {
		if (/Mac|iPhone|iPad/.test(navigator.platform)) {
			shortcut = "⌘K";
		}
	});
</script>

<aside
	class="bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r md:flex print:hidden"
>
	<a href={resolve("/")} class="flex items-center gap-3 px-6 pt-6 pb-4">
		<span class="bg-primary glow size-8 rounded-xl" aria-hidden="true"></span>
		<span class="font-semibold">@orochibraru/ui</span>
	</a>
	<div class="px-3 pb-3">
		<button
			type="button"
			onclick={onsearch}
			class="border-sidebar-border text-muted-foreground hover:bg-sidebar-accent focus-visible:ring-ring/50 flex h-9 w-full items-center gap-2 rounded-xl border bg-white px-3 text-sm outline-none focus-visible:ring-3 dark:bg-transparent"
		>
			<SearchIcon class="size-4" />
			<span class="flex-1 text-left">Search…</span>
			<kbd class="font-sans text-xs tracking-widest">{shortcut}</kbd>
		</button>
	</div>
	<div class="flex-1 overflow-y-auto px-3 pb-6">
		<DocsNav />
	</div>
	<div
		class="border-sidebar-border flex items-center justify-between gap-3 border-t p-4"
	>
		<ThemeToggle />
		<a
			href={resolve("/privacy")}
			class="text-muted-foreground hover:text-foreground text-xs"
			>Privacy and credits</a
		>
	</div>
</aside>
