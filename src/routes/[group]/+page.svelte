<script lang="ts">
	import { resolve } from "$app/paths";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import SlidersHorizontalIcon from "@lucide/svelte/icons/sliders-horizontal";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";
	import * as Tabs from "#lib/components/ui/tabs/index.js";
	import { setPageTitle } from "#lib/page-title.svelte.js";

	import { categories } from "../../docs/catalog.js";
	import { groups } from "../../docs/registry.js";

	const { data } = $props();

	const group = $derived(groups[data.group]);
	const filters = $derived([
		{ value: "all", label: "All", count: group.docs.length },
		...categories
			.map((category) => ({
				value: category as string,
				label: category as string,
				count: group.docs.filter((doc) => doc.category === category).length,
			}))
			.filter((filter) => filter.count > 0),
	]);

	let chosen = $state<Record<string, string>>({});
	let filterOpen = $state(false);

	const category = $derived(chosen[data.group] ?? "all");
	const current = $derived(
		filters.find((filter) => filter.value === category) ?? filters[0],
	);
	const shown = $derived(
		category === "all"
			? group.docs
			: group.docs.filter((doc) => doc.category === category),
	);

	function pick(value: string) {
		chosen[data.group] = value;
		filterOpen = false;
	}

	setPageTitle(() => group.label);
</script>

<p class="text-muted-foreground mb-4">{group.description}</p>

{#snippet list()}
	<ul
		class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[2400px]:grid-cols-6"
	>
		{#each shown as doc (doc.slug)}
			<li class="min-w-0">
				<a
					href={resolve("/[group]/[slug]", {
						group: data.group,
						slug: doc.slug,
					})}
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
{/snippet}

{#if filters.length > 2}
	<div class="mb-4 flex items-center justify-between gap-3 md:hidden">
		<p class="text-muted-foreground text-sm">
			{shown.length}
			{shown.length === 1 ? "component" : "components"}
		</p>
		<Button
			variant={category === "all" ? "outline" : "secondary"}
			class="h-11 rounded-full px-4"
			aria-label={category === "all" ? "Filter" : `Filter: ${current?.label}`}
			onclick={() => (filterOpen = true)}
		>
			<SlidersHorizontalIcon />
			{#if category === "all"}
				Filter
			{:else}
				{current?.label}
				<span
					class="bg-primary text-primary-foreground rounded-full px-1.5 text-xs tabular"
					>{current?.count}</span
				>
			{/if}
		</Button>
	</div>
	<Drawer.Root bind:open={filterOpen}>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Filter {group.label.toLowerCase()}</Drawer.Title>
			</Drawer.Header>
			<ul
				class="flex flex-col px-2 pb-[max(1rem,var(--safe-bottom))]"
				aria-label="Category"
			>
				{#each filters as filter (filter.value)}
					<li>
						<button
							type="button"
							aria-pressed={filter.value === category}
							onclick={() => pick(filter.value)}
							class="active:bg-muted flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left"
						>
							<span class="flex-1 font-medium">{filter.label}</span>
							<span class="text-muted-foreground text-sm tabular"
								>{filter.count}</span
							>
							<CheckIcon
								class="text-primary size-5 {filter.value === category
									? ''
									: 'invisible'}"
							/>
						</button>
					</li>
				{/each}
			</ul>
		</Drawer.Content>
	</Drawer.Root>

	<Tabs.Root bind:value={() => category, (next) => (chosen[data.group] = next)}>
		<div class="no-scrollbar mb-6 overflow-x-auto max-md:hidden">
			<Tabs.List class="w-max">
				{#each filters as filter (filter.value)}
					<Tabs.Trigger value={filter.value} class="shrink-0 gap-1.5">
						{filter.label}
						<span class="text-muted-foreground text-xs tabular"
							>{filter.count}</span
						>
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
		</div>
		<Tabs.Content value={category}>
			{@render list()}
		</Tabs.Content>
	</Tabs.Root>
{:else}
	{@render list()}
{/if}
