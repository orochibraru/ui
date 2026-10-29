<script lang="ts" module>
	import type { Component, Snippet } from "svelte";

	export interface TabItem {
		value: string;
		label: string;
		icon?: Component<{ class?: string }>;
		badge?: string | number;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { untrack } from "svelte";

	import * as Tabs from "#lib/components/ui/tabs/index.js";
	import { cn } from "#lib/utils.js";

	interface Props {
		items: TabItem[];
		value?: string;
		class?: string;
		children: Snippet<[string]>;
	}

	let {
		items,
		value = $bindable(),
		class: className,
		children,
	}: Props = $props();

	value ??= untrack(() => items[0]?.value);

	const active = $derived(value ?? items[0]?.value ?? "");

	let list = $state<HTMLElement | null>(null);

	$effect(() => {
		list
			?.querySelector(`[data-value="${CSS.escape(active)}"]`)
			?.scrollIntoView({ block: "nearest", inline: "nearest" });
	});
</script>

<Tabs.Root
	bind:value={() => active, (next) => (value = next)}
	class={cn("w-full gap-4", className)}
>
	<div class="no-scrollbar w-full overflow-x-auto py-1">
		<TabsPrimitive.List
			bind:ref={list}
			class="glass flex w-max min-w-full gap-1 rounded-full p-1 md:min-w-0"
		>
			{#each items as item (item.value)}
				{@const selected = item.value === active}
				<TabsPrimitive.Trigger
					value={item.value}
					disabled={item.disabled}
					class="text-muted-foreground hover:bg-accent/70 hover:text-foreground data-active:bg-primary data-active:text-primary-foreground data-active:glow focus-visible:ring-ring/50 flex h-11 shrink-0 grow items-center justify-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 md:h-9 md:grow-0"
				>
					{#if item.icon}
						<item.icon class="size-4" />
					{/if}
					{item.label}
					{#if item.badge !== undefined}
						<span
							class={cn(
								"min-w-5 rounded-full px-1.5 text-center text-xs leading-5 tabular-nums",
								selected
									? "bg-primary-foreground/20 text-primary-foreground"
									: "bg-muted text-muted-foreground",
							)}
						>
							{item.badge}
						</span>
					{/if}
				</TabsPrimitive.Trigger>
			{/each}
		</TabsPrimitive.List>
	</div>
	<Tabs.Content value={active}>
		{@render children(active)}
	</Tabs.Content>
</Tabs.Root>
