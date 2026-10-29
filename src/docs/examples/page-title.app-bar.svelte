<script lang="ts">
	import { usePageTitle } from "#lib/page-title.svelte.js";

	const title = usePageTitle();
</script>

<header class="flex h-14 items-center gap-2 px-4">
	{#if title.backHref}
		<a href={title.backHref}>Back</a>
	{/if}
	<h1 class="truncate font-semibold">{title.current}</h1>
</header>
