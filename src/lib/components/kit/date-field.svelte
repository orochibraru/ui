<script lang="ts">
	import {
		type CalendarDate,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today,
	} from "@internationalized/date";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import { MediaQuery } from "svelte/reactivity";

	import { Button } from "#lib/components/ui/button/index.js";
	import { Calendar } from "#lib/components/ui/calendar/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";
	import * as Popover from "#lib/components/ui/popover/index.js";
	import { cn } from "#lib/utils.js";

	import FieldFrame, { errorList, type FieldProps } from "./field-frame.svelte";

	const defaultMessages = {
		placeholder: "Pick a date",
		today: "Today",
		yesterday: "Yesterday",
	};

	type Props = FieldProps & {
		value?: string;
		min?: string;
		max?: string;
		placeholder?: string;
		messages?: Partial<typeof defaultMessages>;
	};

	let {
		value = $bindable(""),
		min,
		max,
		placeholder,
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
	const locale =
		typeof navigator === "undefined" ? "en-US" : navigator.language;

	let open = $state(false);

	function toDate(iso: string | undefined): CalendarDate | undefined {
		if (!iso) {
			return undefined;
		}
		try {
			return parseDate(iso);
		} catch {
			return undefined;
		}
	}

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
	const selected = $derived(toDate(value));
	const minValue = $derived(toDate(min));
	const maxValue = $derived(toDate(max));
	const todayValue = $derived(today(getLocalTimeZone()));
	const shortcuts = $derived(
		[
			{ label: text.today, date: todayValue },
			{ label: text.yesterday, date: todayValue.subtract({ days: 1 }) },
		].filter(
			(shortcut) =>
				(!minValue || shortcut.date.compare(minValue) >= 0) &&
				(!maxValue || shortcut.date.compare(maxValue) <= 0),
		),
	);
	const display = $derived(
		selected
			? selected.toDate(getLocalTimeZone()).toLocaleDateString(locale, {
					weekday: "short",
					day: "numeric",
					month: "long",
					year: "numeric",
				})
			: undefined,
	);
	const triggerClass =
		"border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 flex h-11 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 aria-invalid:ring-3 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

	function choose(next: DateValue | undefined) {
		if (next) {
			value = next.toString();
			open = false;
		}
	}
</script>

{#snippet picker(touch: boolean)}
	{#if shortcuts.length > 0}
		<div class={cn("flex gap-2", touch ? "px-4 pb-1" : "px-3 pt-3")}>
			{#each shortcuts as shortcut (shortcut.label)}
				<Button
					variant={selected?.compare(shortcut.date) === 0
						? "default"
						: "outline"}
					size="sm"
					class={cn("rounded-full", touch && "h-11 flex-1 text-base")}
					onclick={() => choose(shortcut.date)}
				>
					{shortcut.label}
				</Button>
			{/each}
		</div>
	{/if}
	<Calendar
		type="single"
		value={selected}
		onValueChange={choose}
		{minValue}
		{maxValue}
		{locale}
		weekdayFormat="short"
		class={cn(
			"mx-auto bg-transparent",
			touch && "[--cell-size:--spacing(11)] text-base",
		)}
	/>
{/snippet}

{#snippet trigger(props: Record<string, unknown>)}
	<button
		{...props}
		type="button"
		id={triggerId}
		{disabled}
		role="combobox"
		aria-expanded={open}
		aria-invalid={invalid || undefined}
		aria-describedby={describedBy}
		aria-required={required || undefined}
		class={triggerClass}
	>
		<CalendarIcon class="text-muted-foreground size-4 shrink-0" />
		<span
			class={cn("min-w-0 flex-1 truncate", !display && "text-muted-foreground")}
			>{display ?? placeholder ?? text.placeholder}</span
		>
	</button>
{/snippet}

{#snippet drawerContent()}
	<Drawer.Content id="{triggerId}-drawer">
		<Drawer.Header class="px-5 text-left">
			<Drawer.Title>{label ?? placeholder ?? text.placeholder}</Drawer.Title>
		</Drawer.Header>
		{@render picker(true)}
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
	{#if desktop.current}
		<Popover.Root bind:open>
			<Popover.Trigger {disabled}>
				{#snippet child({ props })}
					{@render trigger(props)}
				{/snippet}
			</Popover.Trigger>
			<Popover.Content align="start" class="w-auto rounded-xl p-0">
				{@render picker(false)}
			</Popover.Content>
		</Popover.Root>
	{:else}
		{@render trigger({
			onclick: () => (open = true),
			"aria-haspopup": "dialog",
			"aria-controls": `${triggerId}-drawer`,
		})}
		{#if nested}
			<Drawer.NestedRoot bind:open>{@render drawerContent()}</Drawer.NestedRoot>
		{:else}
			<Drawer.Root bind:open>{@render drawerContent()}</Drawer.Root>
		{/if}
	{/if}
</FieldFrame>
