<script lang="ts">
	import { providePageTitle } from "#lib/page-title.svelte.js";

	const { children } = $props();

	providePageTitle();
</script>

{@render children()}
