<script lang="ts" module>
	import type { Component } from "svelte";

	export interface SectionTab {
		href: string;
		label: string;
		description: string;
		icon: Component<{ class?: string }>;
	}
</script>

<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	const { tabs }: { tabs: SectionTab[] } = $props();
</script>

<nav aria-label="Sections" class="md:hidden">
	<ul class="glass divide-border divide-y overflow-hidden rounded-2xl">
		{#each tabs as tab (tab.href)}
			<li>
				<a
					href={tab.href}
					class="active:bg-muted flex min-h-18 items-center gap-4 px-4 py-3 transition-colors"
				>
					<span
						class="bg-accent text-accent-foreground flex size-11 shrink-0 items-center justify-center rounded-xl"
					>
						<tab.icon class="size-5" />
					</span>
					<span class="min-w-0 flex-1">
						<span class="block font-semibold">{tab.label}</span>
						<span class="text-muted-foreground block text-sm"
							>{tab.description}</span
						>
					</span>
					<ChevronRightIcon class="text-muted-foreground/60 size-5 shrink-0" />
				</a>
			</li>
		{/each}
	</ul>
</nav>
