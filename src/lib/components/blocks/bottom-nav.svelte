<script lang="ts" module>
	import type { Component } from "svelte";

	export interface NavItem {
		href: string;
		label: string;
		icon: Component<{ class?: string }>;
	}

	/** Whether `pathname` sits under the destination at `href`; the root only matches itself. */
	export function isUnder(pathname: string, href: string): boolean {
		return href === "/"
			? pathname === "/"
			: pathname === href || pathname.startsWith(`${href}/`);
	}
</script>

<script lang="ts">
	import { page } from "$app/state";

	interface Props {
		items: NavItem[];
		isActive?: (pathname: string, href: string) => boolean;
		label?: string;
	}

	const { items, isActive = isUnder, label = "Main" }: Props = $props();

	let compact = $state(false);
	let lastY = 0;

	function onscroll() {
		const y = window.scrollY;
		if (Math.abs(y - lastY) < 8) {
			return;
		}
		compact = y > lastY && y > 64;
		lastY = y;
	}
</script>

<svelte:window {onscroll} />

<nav
	class="group/nav fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,var(--safe-bottom))] md:hidden print:hidden"
	style="view-transition-name: tab-bar"
	aria-label={label}
	data-compact={compact || undefined}
>
	<ul
		class="bg-popover border-border mx-auto flex max-w-sm items-center gap-1 rounded-full border p-1.5 shadow-lg"
	>
		{#each items as item (item.href)}
			{@const active = isActive(page.url.pathname, item.href)}
			<li class="flex-1">
				<a
					href={item.href}
					aria-current={active ? "page" : undefined}
					class="text-muted-foreground aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground aria-[current=page]:glow flex h-12 flex-col items-center justify-center gap-0.5 rounded-full px-0.5 text-[0.6875rem] font-medium tracking-tight transition-all group-data-compact/nav:h-10 active:scale-95"
				>
					<item.icon class="size-5" />
					<span class="group-data-compact/nav:sr-only">{item.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
