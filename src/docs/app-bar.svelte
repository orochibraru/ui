<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import MenuIcon from "@lucide/svelte/icons/menu";

	import IconButton from "#lib/components/blocks/icon-button.svelte";
	import * as Sheet from "#lib/components/ui/sheet/index.js";
	import { usePageTitle } from "#lib/page-title.svelte.js";

	import DocsNav from "./docs-nav.svelte";

	const title = usePageTitle();

	let menuOpen = $state(false);

	afterNavigate(() => {
		menuOpen = false;
	});
</script>

<header
	class="bg-background/80 border-border pt-safe-top fixed inset-x-0 top-0 z-40 border-b backdrop-blur-2xl md:hidden print:hidden"
	style="view-transition-name: app-bar"
>
	<div class="relative flex h-14 items-center justify-center px-14">
		{#if title.backHref}
			<div class="absolute top-1/2 left-1.5 -translate-y-1/2">
				<IconButton label="Back" icon={ChevronLeftIcon} href={title.backHref} />
			</div>
		{/if}
		<h1 class="truncate text-[1.0625rem] font-semibold">{title.current}</h1>
		<div class="absolute top-1/2 right-1.5 -translate-y-1/2">
			<IconButton
				label="Components"
				icon={MenuIcon}
				onclick={() => (menuOpen = true)}
			/>
		</div>
	</div>
</header>

<Sheet.Root bind:open={menuOpen}>
	<Sheet.Content side="left" class="w-[85vw] gap-0">
		<Sheet.Header>
			<Sheet.Title>Components</Sheet.Title>
		</Sheet.Header>
		<div
			class="flex-1 overflow-y-auto px-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
		>
			<DocsNav />
		</div>
	</Sheet.Content>
</Sheet.Root>
