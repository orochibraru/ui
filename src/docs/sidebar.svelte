<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";

	import ThemeToggle from "#lib/components/blocks/theme-toggle.svelte";

	import { groups } from "./registry.js";
</script>

<aside
	class="bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r md:flex"
>
	<a href={resolve("/")} class="flex items-center gap-3 px-6 pt-6 pb-4">
		<span class="bg-primary glow size-8 rounded-xl"></span>
		<span class="font-semibold">@orochibraru/ui</span>
	</a>
	<nav aria-label="Components" class="flex-1 overflow-y-auto px-3 pb-6">
		{#each Object.entries(groups) as [group, { label, icon: GroupIcon, docs }] (group)}
			<h2
				class="text-muted-foreground px-3 pt-5 pb-1 text-xs font-medium tracking-wide uppercase"
			>
				<a
					href={resolve("/[group]", { group })}
					class="flex items-center gap-2"
				>
					<GroupIcon class="size-3.5" />
					{label}
				</a>
			</h2>
			<ul>
				{#each docs as doc (doc.slug)}
					{@const href = resolve("/[group]/[slug]", { group, slug: doc.slug })}
					<li>
						<a
							{href}
							aria-current={page.url.pathname === href ? "page" : undefined}
							class="hover:bg-sidebar-accent aria-[current=page]:bg-sidebar-accent aria-[current=page]:text-sidebar-accent-foreground text-sidebar-foreground/80 group flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm aria-[current=page]:font-medium"
						>
							<doc.icon
								class="text-muted-foreground group-aria-[current=page]:text-primary size-4 shrink-0"
							/>
							{doc.name}
						</a>
					</li>
				{/each}
			</ul>
		{/each}
	</nav>
	<div class="border-sidebar-border border-t p-4">
		<ThemeToggle />
	</div>
</aside>
