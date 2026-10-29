<script lang="ts">
	import Menu, { type MenuEntry } from "#lib/components/kit/menu.svelte";

	const { items, title }: { items: MenuEntry[]; title?: string } = $props();
</script>

<Menu {items} {title}>
	{#snippet trigger({ props })}
		<button type="button" {...props}>Team</button>
	{/snippet}
</Menu>
