<script lang="ts">
	import { resolve } from "$app/paths";

	import TabSection from "#lib/components/blocks/tab-section.svelte";

	import { tabs } from "./tabs.js";

	const { children } = $props();
</script>

<TabSection
	title="Section"
	indexHref={resolve("/section")}
	backHref={resolve("/[group]/[slug]", {
		group: "blocks",
		slug: "tab-section",
	})}
	{tabs}
>
	{@render children()}
</TabSection>
