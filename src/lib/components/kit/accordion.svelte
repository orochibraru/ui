<script lang="ts" module>
	export interface AccordionEntry {
		title: string;
		content?: string;
		value?: string;
	}
</script>

<script lang="ts" generics="Item extends AccordionEntry">
	import type { Snippet } from "svelte";

	import * as Accordion from "#lib/components/ui/accordion/index.js";
	import { cn } from "#lib/utils.js";

	interface Props {
		items: Item[];
		type?: "single" | "multiple";
		value?: string | string[];
		children?: Snippet<[Item]>;
		class?: string;
	}

	let {
		items,
		type = "single",
		value = $bindable(),
		children,
		class: className,
	}: Props = $props();
</script>

{#snippet entries()}
	{#each items as item, index (index)}
		<Accordion.Item value={item.value ?? item.title}>
			<Accordion.Trigger>{item.title}</Accordion.Trigger>
			<Accordion.Content>
				{#if children}
					{@render children(item)}
				{:else}
					<p class="text-muted-foreground whitespace-pre-line">
						{item.content}
					</p>
				{/if}
			</Accordion.Content>
		</Accordion.Item>
	{/each}
{/snippet}

{#if type === "multiple"}
	<Accordion.Root
		type="multiple"
		class={cn("w-full", className)}
		bind:value={
			() => (Array.isArray(value) ? value : value ? [value] : []),
			(next) => (value = next)
		}
	>
		{@render entries()}
	</Accordion.Root>
{:else}
	<Accordion.Root
		type="single"
		class={cn("w-full", className)}
		bind:value={
			() => (typeof value === "string" ? value : ""), (next) => (value = next)
		}
	>
		{@render entries()}
	</Accordion.Root>
{/if}
