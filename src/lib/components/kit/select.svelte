<script lang="ts" module>
	import type { Component } from "svelte";

	export interface SelectOption {
		value: string;
		label: string;
		description?: string;
		icon?: Component<{ class?: string }>;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import { MediaQuery } from "svelte/reactivity";

	import * as Command from "#lib/components/ui/command/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";
	import * as Popover from "#lib/components/ui/popover/index.js";
	import * as Select from "#lib/components/ui/select/index.js";
	import { cn } from "#lib/utils.js";

	import FieldFrame, { errorList, type FieldProps } from "./field-frame.svelte";

	const defaultMessages = {
		placeholder: "Select an option",
		search: "Search…",
		empty: "No results.",
	};

	type Props = FieldProps & {
		options: SelectOption[];
		value?: string;
		placeholder?: string;
		searchable?: boolean;
		onValueChange?: (value: string) => void;
		messages?: Partial<typeof defaultMessages>;
	};

	let {
		options,
		value = $bindable(""),
		placeholder,
		searchable = false,
		onValueChange,
		messages = {},
		name,
		label,
		description,
		error,
		required = false,
		disabled = false,
		id,
		class: className,
	}: Props = $props();

	const desktop = new MediaQuery("(min-width: 768px)");
	const nested = Drawer.isInsideDrawer();
	const generatedId = $props.id();

	let open = $state(false);
	let query = $state("");

	const text = $derived({ ...defaultMessages, ...messages });
	const triggerId = $derived(id ?? generatedId);
	const invalid = $derived(errorList(error).length > 0);
	const describedBy = $derived(
		invalid
			? `${triggerId}-error`
			: description
				? `${triggerId}-description`
				: undefined,
	);
	const selected = $derived(options.find((option) => option.value === value));
	const triggerClass =
		"border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 flex h-11 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 aria-invalid:ring-3 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

	function pick(next: string) {
		value = next;
		open = false;
		query = "";
		onValueChange?.(next);
	}
</script>

{#snippet optionContent(option: SelectOption)}
	{#if option.icon}
		<option.icon class="text-muted-foreground size-4 shrink-0" />
	{/if}
	<span class="grid min-w-0 flex-1 text-left">
		<span class="truncate">{option.label}</span>
		{#if option.description}
			<span class="text-muted-foreground truncate text-xs font-normal"
				>{option.description}</span
			>
		{/if}
	</span>
{/snippet}

{#snippet summary(chevron: boolean)}
	{#if selected?.icon}
		<selected.icon class="text-muted-foreground size-4 shrink-0" />
	{/if}
	<span
		class={cn("min-w-0 flex-1 truncate", !selected && "text-muted-foreground")}
		>{selected?.label ?? placeholder ?? text.placeholder}</span
	>
	{#if chevron}
		<ChevronsUpDownIcon class="size-4 shrink-0 opacity-50" />
	{/if}
{/snippet}

{#snippet list(itemClass: string, touch: boolean)}
	{#if searchable}
		<Command.Input
			placeholder={text.search}
			bind:value={query}
			wrapperClass={touch ? "px-0 pt-0 pb-3" : undefined}
			groupClass={touch
				? "h-12! rounded-xl! *:data-[slot=input-group-addon]:pl-3!"
				: undefined}
			class="text-base md:text-sm"
		/>
	{/if}
	<Command.List class="max-h-[min(60dvh,20rem)] max-md:max-h-[55dvh]">
		{#if searchable}
			<Command.Empty>{text.empty}</Command.Empty>
		{/if}
		{#each options as option (option.value)}
			<Command.Item
				value={option.value}
				keywords={[option.label, option.description ?? ""]}
				disabled={option.disabled}
				data-checked={option.value === value}
				onSelect={() => pick(option.value)}
				class={itemClass}
			>
				{@render optionContent(option)}
			</Command.Item>
		{/each}
	</Command.List>
{/snippet}

{#snippet drawerContent()}
	<Drawer.Content id="{triggerId}-drawer">
		<Drawer.Header class="px-5 text-left">
			<Drawer.Title>{label ?? placeholder ?? text.placeholder}</Drawer.Title>
		</Drawer.Header>
		<Command.Root class="bg-transparent px-3">
			{@render list("min-h-12 rounded-xl px-3 text-base", true)}
		</Command.Root>
	</Drawer.Content>
{/snippet}

<FieldFrame
	id={triggerId}
	{label}
	{description}
	{error}
	{required}
	class={className}
>
	{#if name}
		<input type="hidden" {name} {value} {disabled} />
	{/if}
	{#if !desktop.current}
		<button
			type="button"
			id={triggerId}
			{disabled}
			class={triggerClass}
			role="combobox"
			aria-haspopup="dialog"
			aria-expanded={open}
			aria-controls="{triggerId}-drawer"
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			aria-required={required || undefined}
			onclick={() => (open = true)}
		>
			{@render summary(true)}
		</button>
		{#if nested}
			<Drawer.NestedRoot bind:open>{@render drawerContent()}</Drawer.NestedRoot>
		{:else}
			<Drawer.Root bind:open>{@render drawerContent()}</Drawer.Root>
		{/if}
	{:else if !searchable}
		<Select.Root
			type="single"
			{disabled}
			bind:value
			onValueChange={(next) => onValueChange?.(next)}
		>
			<Select.Trigger
				id={triggerId}
				aria-invalid={invalid || undefined}
				aria-describedby={describedBy}
				aria-required={required || undefined}
				class={cn(triggerClass, "data-[size=default]:h-11")}
			>
				{@render summary(false)}
			</Select.Trigger>
			<Select.Content>
				{#each options as option (option.value)}
					<Select.Item
						value={option.value}
						label={option.label}
						disabled={option.disabled}
					>
						{@render optionContent(option)}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	{:else}
		<Popover.Root
			bind:open
			onOpenChange={(next) => {
				if (!next) query = "";
			}}
		>
			<Popover.Trigger
				id={triggerId}
				{disabled}
				role="combobox"
				aria-invalid={invalid || undefined}
				aria-describedby={describedBy}
				aria-required={required || undefined}
				class={triggerClass}
			>
				{@render summary(true)}
			</Popover.Trigger>
			<Popover.Content
				align="start"
				class="w-(--bits-popover-anchor-width) min-w-64 rounded-xl p-0"
			>
				<Command.Root class="bg-transparent">
					{@render list("", false)}
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	{/if}
</FieldFrame>
