<script lang="ts">
	import InstallPrompt from "#lib/components/blocks/install-prompt.svelte";

	const { children } = $props();
</script>

{@render children()}
<InstallPrompt appName="OpenCount" storageKey="opencount-install-prompt">
	{#snippet brand()}
		<img src="/icon-192.png" alt="" class="size-14 rounded-2xl" />
	{/snippet}
</InstallPrompt>
