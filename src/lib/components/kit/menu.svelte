<script lang="ts" module>
	import type { Component, Snippet } from "svelte";

	export interface MenuItem {
		label: string;
		icon?: Component<{ class?: string }>;
		href?: string;
		onSelect?: () => void;
		shortcut?: string;
		destructive?: boolean;
		disabled?: boolean;
	}

	export type MenuEntry = MenuItem | "separator";

	export type MenuTrigger = Snippet<[{ props: Record<string, unknown> }]>;
</script>

<script lang="ts">
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import { MediaQuery } from "svelte/reactivity";

	import IconButton from "#lib/components/blocks/icon-button.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import { Separator } from "#lib/components/ui/separator/index.js";
	import { cn } from "#lib/utils.js";

	const defaultMessages = {
		label: "More actions",
	};

	interface Props {
		items: MenuEntry[];
		trigger?: MenuTrigger;
		label?: string;
		title?: string;
		align?: "start" | "center" | "end";
		messages?: Partial<typeof defaultMessages>;
	}

	const {
		items,
		trigger,
		label,
		title,
		align = "end",
		messages = {},
	}: Props = $props();

	const desktop = new MediaQuery("(min-width: 768px)");
	const text = $derived({ ...defaultMessages, ...messages });
	const accessibleName = $derived(label ?? text.label);

	let open = $state(false);

	function select(item: MenuItem) {
		open = false;
		item.onSelect?.();
	}
</script>

{#snippet defaultTrigger(props: Record<string, unknown>)}
	<IconButton
		{...props}
		label={accessibleName}
		icon={EllipsisIcon}
		class="text-muted-foreground"
	/>
{/snippet}

{#snippet itemContent(item: MenuItem)}
	{#if item.icon}
		<item.icon class={desktop.current ? "size-4" : "size-5"} />
	{/if}
	<span class="truncate">{item.label}</span>
{/snippet}

{#if desktop.current}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				{#if trigger}
					{@render trigger({ props })}
				{:else}
					{@render defaultTrigger(props)}
				{/if}
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content {align} class="min-w-48">
			{#each items as item, index (index)}
				{#if item === "separator"}
					<DropdownMenu.Separator />
				{:else if item.href && !item.disabled}
					<DropdownMenu.Item
						variant={item.destructive ? "destructive" : "default"}
						onSelect={() => select(item)}
					>
						{#snippet child({ props })}
							<a href={item.href} {...props}>
								{@render itemContent(item)}
								{#if item.shortcut}
									<DropdownMenu.Shortcut>{item.shortcut}</DropdownMenu.Shortcut>
								{/if}
							</a>
						{/snippet}
					</DropdownMenu.Item>
				{:else}
					<DropdownMenu.Item
						variant={item.destructive ? "destructive" : "default"}
						disabled={item.disabled}
						onSelect={() => select(item)}
					>
						{@render itemContent(item)}
						{#if item.shortcut}
							<DropdownMenu.Shortcut>{item.shortcut}</DropdownMenu.Shortcut>
						{/if}
					</DropdownMenu.Item>
				{/if}
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	{@const props = {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": open,
		onclick: () => (open = true),
	}}
	{#if trigger}
		{@render trigger({ props })}
	{:else}
		{@render defaultTrigger(props)}
	{/if}
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header class={cn("px-5 text-left", !title && "sr-only")}>
				<Drawer.Title class="truncate">{title ?? accessibleName}</Drawer.Title>
			</Drawer.Header>
			<div class="flex flex-col gap-1 px-3 pb-4">
				{#each items as item, index (index)}
					{#if item === "separator"}
						<Separator class="my-1" />
					{:else}
						<Button
							variant="ghost"
							href={item.href}
							disabled={item.disabled}
							class={cn(
								"h-12 justify-start gap-3 rounded-xl px-3 text-base",
								item.destructive && "text-destructive hover:text-destructive",
							)}
							onclick={() => select(item)}
						>
							{@render itemContent(item)}
						</Button>
					{/if}
				{/each}
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
