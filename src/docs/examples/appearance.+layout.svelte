<script lang="ts">
	import { ModeWatcher } from "mode-watcher";

	import { appearanceBootScript } from "#lib/appearance.js";

	const { children, data } = $props();
</script>

<svelte:head>
	{@html appearanceBootScript(data.appearance)}
</svelte:head>

<ModeWatcher defaultMode={data.appearance.theme} />
{@render children()}
