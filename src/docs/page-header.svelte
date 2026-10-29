<script lang="ts">
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";

	import IconButton from "#lib/components/blocks/icon-button.svelte";
	import { usePageTitle } from "#lib/page-title.svelte.js";

	const title = usePageTitle();
</script>

<header class="mb-6 hidden min-h-10 items-center gap-3 md:flex">
	{#if title.backHref}
		<IconButton
			label="Back"
			icon={ChevronLeftIcon}
			href={title.backHref}
			variant="outline"
		/>
	{/if}
	<h1 class="min-w-0 flex-1 truncate text-2xl font-semibold tracking-tight">
		{title.current}
	</h1>
</header>
