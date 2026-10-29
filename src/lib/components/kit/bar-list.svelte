<script lang="ts" module>
	import type { Component } from "svelte";

	export interface BarListItem {
		label: string;
		value: number;
		href?: string;
		icon?: Component<{ class?: string }>;
	}
</script>

<script lang="ts">
	import { cn } from "#lib/utils.js";

	const defaultMessages = {
		empty: "Nothing to show yet.",
		showAll: "Show all",
		showLess: "Show less",
	};

	interface Props {
		items: BarListItem[];
		format?: (value: number) => string;
		max?: number;
		messages?: Partial<typeof defaultMessages>;
		class?: string;
	}

	const {
		items,
		format = (value: number) => value.toLocaleString(),
		max,
		messages = {},
		class: className,
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
	const ranked = $derived(
		items.toSorted((left, right) => right.value - left.value),
	);
	const largest = $derived(Math.max(0, ...ranked.map((item) => item.value)));
	const collapsible = $derived(max !== undefined && ranked.length > max);

	let expanded = $state(false);

	const shown = $derived(
		collapsible && !expanded ? ranked.slice(0, max) : ranked,
	);

	function width(value: number): string {
		return largest > 0 ? `${(Math.max(0, value) / largest) * 100}%` : "0%";
	}
</script>

{#snippet row(item: BarListItem)}
	<span class="flex items-center gap-2 text-sm">
		{#if item.icon}
			<item.icon class="text-muted-foreground size-4 shrink-0" />
		{/if}
		<span class="min-w-0 flex-1 truncate">{item.label}</span>
		<span class="tabular shrink-0 font-medium">{format(item.value)}</span>
	</span>
	<span class="bg-muted block h-2 rounded-r-full" aria-hidden="true">
		<span
			class="bg-primary block h-full rounded-r-full"
			style:width={width(item.value)}
		></span>
	</span>
{/snippet}

<div class={cn("flex w-full flex-col gap-2", className)}>
	{#if ranked.length === 0}
		<p class="text-muted-foreground text-sm">{text.empty}</p>
	{:else}
		<ol class="flex flex-col gap-1">
			{#each shown as item, index (index)}
				<li>
					{#if item.href}
						<a
							href={item.href}
							class="hover:bg-muted focus-visible:ring-ring/50 flex flex-col gap-1.5 rounded-lg px-2 py-1.5 outline-none focus-visible:ring-3"
						>
							{@render row(item)}
						</a>
					{:else}
						<div class="flex flex-col gap-1.5 px-2 py-1.5">
							{@render row(item)}
						</div>
					{/if}
				</li>
			{/each}
		</ol>
		{#if collapsible}
			<button
				type="button"
				aria-expanded={expanded}
				onclick={() => (expanded = !expanded)}
				class="text-primary focus-visible:ring-ring/50 h-11 self-start rounded-md px-2 text-sm font-medium outline-none hover:underline focus-visible:ring-3 md:h-9"
			>
				{expanded ? text.showLess : text.showAll}
			</button>
		{/if}
	{/if}
</div>
