<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";

	import { type Group, groups } from "./registry.js";

	const currentGroup = $derived(page.url.pathname.split("/")[1] ?? "");

	let expanded = $state<Partial<Record<Group, boolean>>>({});

	function isOpen(group: Group): boolean {
		return expanded[group] ?? group === currentGroup;
	}
</script>

<nav aria-label="Components" class="flex flex-col gap-1">
	{#each Object.entries(groups) as [key, { label, icon: GroupIcon, docs }] (key)}
		{@const group = key as Group}
		{@const href = resolve("/[group]", { group })}
		<div class="flex items-center gap-1">
			<a
				{href}
				aria-current={page.url.pathname === href ? "page" : undefined}
				class="hover:bg-sidebar-accent aria-[current=page]:bg-sidebar-accent text-sidebar-foreground flex min-h-11 flex-1 items-center gap-3 rounded-xl px-3 text-sm font-semibold md:min-h-9"
			>
				<GroupIcon class="text-primary size-4" />
				{label}
				<span class="text-muted-foreground ml-auto text-xs font-normal tabular"
					>{docs.length}</span
				>
			</a>
			<button
				type="button"
				aria-expanded={isOpen(group)}
				aria-label="{isOpen(group) ? 'Collapse' : 'Expand'} {label}"
				onclick={() => (expanded[group] = !isOpen(group))}
				class="hover:bg-sidebar-accent text-muted-foreground flex size-11 shrink-0 items-center justify-center rounded-xl md:size-9"
			>
				<ChevronDownIcon
					class="size-4 transition-transform {isOpen(group)
						? ''
						: '-rotate-90'}"
				/>
			</button>
		</div>
		{#if isOpen(group)}
			<ul class="border-sidebar-border mb-2 ml-5 border-l pl-2">
				{#each docs as doc (doc.slug)}
					{@const docHref = resolve("/[group]/[slug]", {
						group,
						slug: doc.slug,
					})}
					<li>
						<a
							href={docHref}
							aria-current={page.url.pathname === docHref ? "page" : undefined}
							class="hover:bg-sidebar-accent aria-[current=page]:bg-sidebar-accent aria-[current=page]:text-sidebar-accent-foreground text-sidebar-foreground/80 group flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm aria-[current=page]:font-medium md:min-h-8"
						>
							<doc.icon
								class="text-muted-foreground group-aria-[current=page]:text-primary size-4 shrink-0"
							/>
							{doc.name}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	{/each}
</nav>
