<script lang="ts">
	import { resolve } from "$app/paths";

	import ThemeToggle from "#lib/components/blocks/theme-toggle.svelte";

	import DocsNav from "./docs-nav.svelte";
</script>

<aside
	class="bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r md:flex print:hidden"
>
	<a href={resolve("/")} class="flex items-center gap-3 px-6 pt-6 pb-4">
		<span class="bg-primary glow size-8 rounded-xl"></span>
		<span class="font-semibold">@orochibraru/ui</span>
	</a>
	<div class="flex-1 overflow-y-auto px-3 pb-6">
		<DocsNav />
	</div>
	<div class="border-sidebar-border border-t p-4">
		<ThemeToggle />
	</div>
</aside>
