<script lang="ts">
	import TopLoadingBar from "#lib/components/blocks/top-loading-bar.svelte";

	const { children } = $props();
</script>

<TopLoadingBar />
{@render children()}
