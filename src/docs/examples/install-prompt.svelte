<script lang="ts">
	import InstallPrompt from "#lib/components/blocks/install-prompt.svelte";
	import { Button } from "#lib/components/ui/button/index.js";

	let open = $state(false);
</script>

<div class="grid justify-items-start gap-4">
	<p class="text-muted-foreground text-sm">
		On a phone it opens by itself once; bind <code>open</code> to show it again from
		a settings page. It picks the native prompt, the iOS Share steps or the browser
		menu steps.
	</p>
	<Button onclick={() => (open = true)}>Show the install sheet</Button>
</div>
<InstallPrompt appName="Acme" storageKey="acme-install-prompt" bind:open>
	{#snippet brand()}
		<div class="bg-primary glow size-14 rounded-2xl"></div>
	{/snippet}
</InstallPrompt>
