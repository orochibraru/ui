<script lang="ts">
	import { setPageTitle } from "#lib/page-title.svelte.js";

	import { demoOf, findDoc } from "../../../../docs/registry.js";

	const { data } = $props();

	const doc = $derived(findDoc(data.group, data.slug));
	const Demo = $derived(demoOf(data.group, data.slug));

	setPageTitle(() => doc?.name ?? "");
</script>

<main
	class="min-h-dvh pt-[calc(var(--safe-top)+1rem)] pr-[calc(var(--safe-right)+1rem)] pb-[calc(var(--safe-bottom)+1rem)] pl-[calc(var(--safe-left)+1rem)]"
>
	<h1 class="mb-4 text-xl font-semibold">{doc?.name}</h1>
	<Demo />
</main>
