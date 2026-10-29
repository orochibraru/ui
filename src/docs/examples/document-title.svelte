<script lang="ts">
	import Input from "#lib/components/kit/input.svelte";
	import { usePageTitle } from "#lib/page-title.svelte.js";

	const title = usePageTitle();
</script>

<Input
	label="Page title"
	description="The header above and this browser tab follow as you type."
	bind:value={title.current}
/>
