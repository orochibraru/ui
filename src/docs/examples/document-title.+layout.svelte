<script lang="ts">
	import DocumentTitle from "#lib/components/blocks/document-title.svelte";
	import { providePageTitle } from "#lib/page-title.svelte.js";

	const { children } = $props();

	providePageTitle();
</script>

<DocumentTitle appName="OpenCount" />
{@render children()}
