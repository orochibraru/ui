<script lang="ts">
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";

	import IconButton from "#lib/components/blocks/icon-button.svelte";
	import { usePageTitle } from "#lib/page-title.svelte.js";

	const title = usePageTitle();
</script>

<header
	class="bg-background/80 border-border pt-safe-top fixed inset-x-0 top-0 z-40 border-b backdrop-blur-2xl md:hidden"
	style="view-transition-name: app-bar"
>
	<div class="relative flex h-14 items-center justify-center px-14">
		{#if title.backHref}
			<div class="absolute top-1/2 left-1.5 -translate-y-1/2">
				<IconButton label="Back" icon={ChevronLeftIcon} href={title.backHref} />
			</div>
		{/if}
		<h1 class="truncate text-[1.0625rem] font-semibold">{title.current}</h1>
	</div>
</header>
