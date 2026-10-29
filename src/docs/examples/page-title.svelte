<script lang="ts">
	import { usePageTitle } from "#lib/page-title.svelte.js";

	const title = usePageTitle();
</script>

<p class="text-muted-foreground text-sm">
	This page set its title to <strong>{title.current}</strong> and its back
	button to <code>{title.backHref}</code>. The phone app bar, the desktop header
	and the browser tab all read it.
</p>
