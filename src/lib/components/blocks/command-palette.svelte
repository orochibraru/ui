<script lang="ts" module>
	import type { Component } from "svelte";

	export interface CommandItem {
		label: string;
		href?: string;
		onSelect?: () => void;
		icon?: Component<{ class?: string }>;
		description?: string;
		shortcut?: string;
		keywords?: string[];
	}

	export interface CommandGroup {
		heading: string;
		items: CommandItem[];
	}
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import SearchIcon from "@lucide/svelte/icons/search";
	import SearchXIcon from "@lucide/svelte/icons/search-x";
	import { onMount } from "svelte";
	import { MediaQuery } from "svelte/reactivity";

	import * as Command from "#lib/components/ui/command/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";
	import { haptic } from "#lib/haptics.js";

	const defaultMessages = {
		trigger: "Search…",
		label: "Search",
		title: "Command palette",
		description: "Search for a page or run a command",
		empty: "No results.",
		navigate: "to navigate",
		open: "to open",
		close: "to close",
	};

	interface Props {
		groups: CommandGroup[];
		open?: boolean;
		placeholder?: string;
		shortcut?: boolean;
		trigger?: boolean;
		filter?: boolean;
		onsearch?: (term: string) => void;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		groups,
		open = $bindable(false),
		placeholder = "Type a command or search…",
		shortcut = true,
		trigger = true,
		filter = true,
		onsearch,
		messages = {},
	}: Props = $props();

	const desktop = new MediaQuery("(min-width: 768px)");
	const text = $derived({ ...defaultMessages, ...messages });

	let search = $state("");
	let mac = $state(false);

	onMount(() => {
		mac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
	});

	/** Every typed word has to appear in the label or a keyword; label matches rank first. */
	function matchWords(value: string, term: string, keywords: string[] = []) {
		const words = term.toLowerCase().split(/\s+/).filter(Boolean);
		const label = value.toLowerCase();
		const haystack = [label, ...keywords].join(" ").toLowerCase();
		if (!words.every((word) => haystack.includes(word))) {
			return 0;
		}
		return words.every((word) => label.includes(word)) ? 1 : 0.5;
	}

	function setSearch(term: string) {
		search = term;
		onsearch?.(term);
	}

	function isTyping(target: EventTarget | null): boolean {
		return (
			target instanceof HTMLElement &&
			(target.isContentEditable || target.matches("input, textarea, select"))
		);
	}

	function onkeydown(event: KeyboardEvent) {
		if (
			shortcut &&
			event.key.toLowerCase() === "k" &&
			(mac ? event.metaKey : event.ctrlKey) &&
			(open || !isTyping(event.target))
		) {
			event.preventDefault();
			open = !open;
		}
	}

	function select(item: CommandItem) {
		haptic("tap");
		open = false;
		setSearch("");
		if (item.onSelect) {
			item.onSelect();
		} else if (item.href) {
			void goto(item.href);
		}
	}
</script>

<svelte:window {onkeydown} />

{#snippet results()}
	<Command.Empty>
		<div
			class="text-muted-foreground flex flex-col items-center gap-2 py-10 text-sm"
		>
			<SearchXIcon class="size-6" />
			{text.empty}
		</div>
	</Command.Empty>
	{#each groups as group (group.heading)}
		<Command.Group
			heading={group.heading}
			class="p-0 pb-2 **:data-command-group-heading:px-2.5 **:data-command-group-heading:pt-3 **:data-command-group-heading:pb-1.5 **:data-command-group-heading:text-[0.6875rem] **:data-command-group-heading:font-semibold **:data-command-group-heading:tracking-wider **:data-command-group-heading:uppercase"
		>
			{#each group.items as item (item.label)}
				<Command.Item
					value={item.label}
					keywords={item.description
						? [...(item.keywords ?? []), item.description]
						: item.keywords}
					onSelect={() => select(item)}
					class="group/item data-selected:bg-accent data-selected:**:[svg]:text-current min-h-11 gap-3 rounded-xl! px-2.5 py-1.5 max-md:min-h-13 max-md:text-base [&>svg:last-child]:hidden"
				>
					{#if item.icon}
						<span
							class="bg-muted text-muted-foreground group-data-selected/item:bg-primary group-data-selected/item:text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors"
						>
							<item.icon class="size-4" />
						</span>
					{/if}
					<span class="min-w-0 flex-1 truncate font-medium">{item.label}</span>
					{#if item.description}
						<span
							class="text-muted-foreground bg-muted group-data-selected/item:bg-background/70 max-w-[40%] shrink-0 truncate rounded-full px-2 py-0.5 text-[0.6875rem]"
						>
							{item.description}
						</span>
					{/if}
					{#if item.shortcut}
						<kbd
							class="bg-background text-muted-foreground shrink-0 rounded-md border px-1.5 py-0.5 font-sans text-[0.6875rem] font-medium tracking-widest max-md:hidden"
						>
							{item.shortcut}
						</kbd>
					{/if}
				</Command.Item>
			{/each}
		</Command.Group>
	{/each}
{/snippet}

{#snippet key(label: string)}
	<kbd
		class="bg-background text-foreground inline-flex h-5 min-w-5 items-center justify-center rounded-md border px-1 font-sans text-[0.6875rem] font-medium shadow-xs"
		>{label}</kbd
	>
{/snippet}

{#if trigger}
	<button
		type="button"
		aria-label={text.label}
		class="text-muted-foreground hover:text-foreground border-input focus-visible:ring-ring/50 dark:bg-input/30 flex h-11 w-full min-w-0 items-center gap-2 rounded-xl border bg-white px-3 text-base shadow-xs transition-colors outline-none focus-visible:ring-3 md:h-9 md:w-64 md:rounded-md md:px-2.5 md:text-sm"
		onclick={() => {
			open = true;
		}}
	>
		<SearchIcon class="size-5 shrink-0 md:size-4" />
		<span class="truncate">{text.trigger}</span>
		{#if shortcut}
			<kbd
				class="bg-muted ml-auto hidden rounded px-1.5 font-sans text-[0.6875rem] font-medium tracking-widest md:inline"
			>
				{mac ? "⌘K" : "Ctrl K"}
			</kbd>
		{/if}
	</button>
{/if}

{#if desktop.current}
	<Command.Dialog
		bind:open
		class="rounded-2xl! shadow-2xl sm:max-w-2xl"
		title={text.title}
		description={text.description}
		shouldFilter={filter}
		filter={matchWords}
	>
		<div class="relative border-b">
			<Command.Input
				bind:value={() => search, setSearch}
				{placeholder}
				class="text-base"
				wrapperClass="p-2"
				groupClass="h-12! border-0! bg-transparent! *:data-[slot=input-group-addon]:pl-3!"
			/>
			<span class="absolute top-1/2 right-4 -translate-y-1/2">
				{@render key("esc")}
			</span>
		</div>
		<Command.List class="max-h-[min(26rem,60dvh)] scroll-py-2 p-2">
			{@render results()}
		</Command.List>
		<div
			class="text-muted-foreground bg-muted/40 flex items-center gap-4 border-t px-4 py-2.5 text-xs"
		>
			<span class="flex items-center gap-1.5">
				{@render key("↑")}{@render key("↓")}
				{text.navigate}
			</span>
			<span class="flex items-center gap-1.5">
				{@render key("↵")}
				{text.open}
			</span>
			<span class="ml-auto flex items-center gap-1.5">
				{@render key("esc")}
				{text.close}
			</span>
		</div>
	</Command.Dialog>
{:else}
	<Drawer.Root bind:open autoFocus>
		<Drawer.Content class="h-[85dvh]">
			<Drawer.Header class="sr-only">
				<Drawer.Title>{text.title}</Drawer.Title>
				<Drawer.Description>{text.description}</Drawer.Description>
			</Drawer.Header>
			<Command.Root
				shouldFilter={filter}
				filter={matchWords}
				class="min-h-0 flex-1 rounded-none! bg-transparent p-0"
			>
				<Command.Input
					bind:value={() => search, setSearch}
					{placeholder}
					class="text-base"
					wrapperClass="px-4 pb-3"
					groupClass="h-12! rounded-xl! border-0! bg-muted! *:data-[slot=input-group-addon]:pl-3!"
				/>
				<Command.List class="pb-safe-bottom max-h-none flex-1 px-2">
					{@render results()}
				</Command.List>
			</Command.Root>
		</Drawer.Content>
	</Drawer.Root>
{/if}
