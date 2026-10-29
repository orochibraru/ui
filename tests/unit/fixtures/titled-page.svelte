<script lang="ts">
	import DocumentTitle from "#lib/components/blocks/document-title.svelte";
	import { providePageTitle, setPageTitle } from "#lib/page-title.svelte.js";

	const { title, backHref }: { title: string; backHref?: string } = $props();

	const holder = providePageTitle();
	setPageTitle(
		() => title,
		() => backHref,
	);
</script>

<DocumentTitle appName="Demo" />
<p data-testid="back">{holder.backHref ?? ""}</p>
