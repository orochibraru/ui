<script lang="ts">
	import Tabs, { type TabItem } from "#lib/components/kit/tabs.svelte";

	let { items, value = $bindable() }: { items: TabItem[]; value?: string } =
		$props();
</script>

<Tabs {items} bind:value>
	{#snippet children(active)}
		<p data-testid="panel">Panel {active}</p>
	{/snippet}
</Tabs>
<output data-testid="bound">{value}</output>
