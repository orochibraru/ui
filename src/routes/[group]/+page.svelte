<script lang="ts">
	import { resolve } from "$app/paths";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	import { setPageTitle } from "#lib/page-title.svelte.js";

	import { groups } from "../../docs/registry.js";

	const { data } = $props();

	const group = $derived(groups[data.group]);

	setPageTitle(() => group.label);
</script>

<p class="text-muted-foreground mb-6">{group.description}</p>
<ul
	class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[2400px]:grid-cols-6"
>
	{#each group.docs as doc (doc.slug)}
		<li>
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
