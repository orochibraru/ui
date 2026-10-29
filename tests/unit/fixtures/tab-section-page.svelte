<script lang="ts">
	import type { SectionTab } from "#lib/components/blocks/nav-cards.svelte";
	import TabSection from "#lib/components/blocks/tab-section.svelte";
	import { providePageTitle } from "#lib/page-title.svelte.js";

	const { tabs }: { tabs: SectionTab[] } = $props();

	const holder = providePageTitle();
</script>

<TabSection title="Account" indexHref="/account" backHref="/" {tabs}>
	<p>Tab content</p>
</TabSection>
<p data-testid="title">{holder.current}</p>
<p data-testid="back">{holder.backHref ?? ""}</p>
