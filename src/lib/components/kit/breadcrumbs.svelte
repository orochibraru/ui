<script lang="ts" module>
	export interface Crumb {
		label: string;
		href?: string;
	}
</script>

<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import { MediaQuery } from "svelte/reactivity";

	import { cn } from "#lib/utils.js";

	import Menu from "./menu.svelte";

	const defaultMessages = {
		label: "Breadcrumb",
		more: "Show hidden pages",
	};

	interface Props {
		items: Crumb[];
		class?: string;
		messages?: Partial<typeof defaultMessages>;
	}

	const { items, class: className, messages = {} }: Props = $props();

	const desktop = new MediaQuery("(min-width: 768px)");
	const text = $derived({ ...defaultMessages, ...messages });

	const visibleTail = $derived(desktop.current ? 2 : 1);
	const collapsed = $derived(
		items.length > (desktop.current ? 4 : 2)
			? items.slice(1, items.length - visibleTail)
			: [],
	);
	const shown = $derived(
		collapsed.length > 0
			? [...items.slice(0, 1), ...items.slice(items.length - visibleTail)]
			: items,
	);
</script>

{#snippet separator()}
	<li role="presentation" aria-hidden="true" class="text-muted-foreground/70">
		<ChevronRightIcon class="size-3.5" />
	</li>
{/snippet}

<nav aria-label={text.label} class={cn("w-full min-w-0", className)}>
	<ol class="text-muted-foreground flex min-w-0 items-center gap-1 text-sm">
		{#each shown as crumb, index (index)}
			{@const current = index === shown.length - 1}
			{#if index > 0}
				{@render separator()}
			{/if}
			<li class={cn("flex min-w-0 items-center", !current && "shrink-2")}>
				{#if current}
					<span aria-current="page" class="text-foreground truncate font-medium"
						>{crumb.label}</span
					>
				{:else if crumb.href}
					<a
						href={crumb.href}
						class="hover:text-foreground focus-visible:ring-ring/50 flex h-11 min-w-0 items-center rounded-md px-1 transition-colors outline-none focus-visible:ring-3 md:h-8"
					>
						<span class="truncate">{crumb.label}</span>
					</a>
				{:else}
					<span class="truncate px-1">{crumb.label}</span>
				{/if}
			</li>
			{#if index === 0 && collapsed.length > 0}
				{@render separator()}
				<li class="flex shrink-0 items-center">
					<Menu
						align="start"
						label={text.more}
						items={collapsed.map((hidden) => ({
							label: hidden.label,
							href: hidden.href,
							disabled: !hidden.href,
						}))}
					>
						{#snippet trigger({ props })}
							<button
								type="button"
								{...props}
								aria-label={text.more}
								class="hover:text-foreground hover:bg-muted focus-visible:ring-ring/50 flex size-11 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-3 md:size-8"
							>
								<EllipsisIcon class="size-4" />
							</button>
						{/snippet}
					</Menu>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
