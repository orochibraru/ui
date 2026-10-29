<script lang="ts">
	import { resolve } from "$app/paths";

	import { setPageTitle } from "#lib/page-title.svelte.js";

	import CodeBlock from "../../../docs/code-block.svelte";
	import { demoOf, findDoc } from "../../../docs/registry.js";

	const { data } = $props();

	const doc = $derived(findDoc(data.group, data.slug));
	const Demo = $derived(demoOf(data.slug));

	setPageTitle(
		() => doc?.name ?? "",
		() => resolve("/[group]", { group: data.group }),
	);
</script>

<div class="grid gap-6">
	<p class="text-muted-foreground">{doc?.description}</p>
	<section
		aria-label="Preview"
		class="bg-card border-border flex min-h-40 flex-col justify-center rounded-2xl border p-4 md:p-8"
	>
		{#key data.slug}
			<Demo />
		{/key}
	</section>
	<section class="grid gap-3">
		<h2 class="text-lg font-semibold">Usage</h2>
		{#each data.sources as file (file.name)}
			<CodeBlock {...file} />
		{/each}
	</section>
</div>
