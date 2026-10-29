<script lang="ts">
	import { usePageTitle } from "../../page-title.svelte.js";

	const { appName }: { appName: string } = $props();

	const title = usePageTitle();
	const text = $derived(
		!title.current
			? appName
			: title.current.includes(appName)
				? title.current
				: `${title.current} · ${appName}`,
	);
</script>

<svelte:head>
	<title>{text}</title>
</svelte:head>
