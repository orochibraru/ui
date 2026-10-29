<script lang="ts">
	import { resolve } from "$app/paths";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";
	import { setPageTitle } from "#lib/page-title.svelte.js";

	import { categories } from "../../docs/catalog.js";
	import { groups } from "../../docs/registry.js";

	const { data } = $props();

	const group = $derived(groups[data.group]);
	const present = $derived(
		categories.filter((category) =>
			group.docs.some((doc) => doc.category === category),
		),
	);

	let chosen = $state<Record<string, string>>({});
	const category = $derived(chosen[data.group] ?? "all");

	const shown = $derived(
		category === "all"
			? group.docs
			: group.docs.filter((doc) => doc.category === category),
	);

	setPageTitle(() => group.label);
</script>

<p class="text-muted-foreground mb-4">{group.description}</p>
{#if present.length > 1}
	<ToggleGroup.Root
		type="single"
		variant="outline"
		size="sm"
		spacing={2}
		aria-label="Category"
		class="mb-6 flex-wrap"
		bind:value={() => category, (next) => (chosen[data.group] = next || "all")}
	>
		<ToggleGroup.Item value="all" class="rounded-full px-3"
			>All</ToggleGroup.Item
		>
		{#each present as name (name)}
			<ToggleGroup.Item value={name} class="rounded-full px-3"
				>{name}</ToggleGroup.Item
			>
		{/each}
	</ToggleGroup.Root>
{/if}
<ul
	class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[2400px]:grid-cols-6"
>
	{#each shown as doc (doc.slug)}
		<li class="min-w-0">
			<a
				href={resolve("/[group]/[slug]", { group: data.group, slug: doc.slug })}
				class="glass hover:border-primary/40 active:bg-muted flex h-full items-center gap-4 rounded-2xl p-4 transition-colors"
			>
				<span
					class="bg-accent text-accent-foreground flex size-11 shrink-0 items-center justify-center rounded-xl"
				>
					<doc.icon class="size-5" />
				</span>
				<span class="min-w-0 flex-1">
					<span class="block font-semibold">{doc.name}</span>
					<span class="text-muted-foreground block text-sm"
						>{doc.description}</span
					>
				</span>
				<ChevronRightIcon class="text-muted-foreground/60 size-5 shrink-0" />
			</a>
		</li>
	{/each}
</ul>
