<script lang="ts" module>
	export interface TimeRange {
		preset: string;
		start: Date;
		end: Date;
	}

	export type TimeRangePreset = { id: string; label: string } & (
		{ duration: number } | { range: (now: Date) => { start: Date; end: Date } }
	);

	const day = 86_400_000;

	export const defaultTimeRangePresets: readonly TimeRangePreset[] = [
		{ id: "24h", label: "24 hours", duration: day },
		{ id: "7d", label: "7 days", duration: 7 * day },
		{ id: "30d", label: "30 days", duration: 30 * day },
		{ id: "90d", label: "90 days", duration: 90 * day },
		{
			id: "12m",
			label: "12 months",
			range: (now) => {
				const start = new Date(now);
				start.setFullYear(start.getFullYear() - 1);
				return { start, end: new Date(now) };
			},
		},
	];

	export function rangeFor(preset: TimeRangePreset, now: Date): TimeRange {
		const { start, end } =
			"range" in preset
				? preset.range(now)
				: {
						start: new Date(now.getTime() - preset.duration),
						end: new Date(now),
					};
		return { preset: preset.id, start, end };
	}
</script>

<script lang="ts">
	import {
		type DateValue,
		fromDate,
		getLocalTimeZone,
		toCalendarDate,
		today,
	} from "@internationalized/date";
	import { MediaQuery } from "svelte/reactivity";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";
	import * as Popover from "#lib/components/ui/popover/index.js";
	import { RangeCalendar } from "#lib/components/ui/range-calendar/index.js";
	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";
	import { cn } from "#lib/utils.js";

	const defaultMessages = {
		label: "Time range",
		custom: "Custom",
		customTitle: "Custom range",
		apply: "Apply",
		cancel: "Cancel",
	};

	interface Props {
		presets?: readonly TimeRangePreset[];
		value?: TimeRange;
		onchange?: (value: TimeRange) => void;
		messages?: Partial<typeof defaultMessages>;
		class?: string;
	}

	let {
		presets = defaultTimeRangePresets,
		value = $bindable(initialRange()),
		onchange,
		messages = {},
		class: className,
	}: Props = $props();

	function initialRange(): TimeRange {
		const now = new Date();
		const preset = presets.find((entry) => entry.id === "30d") ?? presets[0];
		return preset
			? rangeFor(preset, now)
			: { preset: "", start: now, end: now };
	}

	const timeZone = getLocalTimeZone();
	const desktop = new MediaQuery("(min-width: 768px)");
	const dayFormat = new Intl.DateTimeFormat(undefined, {
		day: "numeric",
		month: "short",
	});

	let open = $state(false);
	let draft = $state<{
		start: DateValue | undefined;
		end: DateValue | undefined;
	}>({ start: undefined, end: undefined });
	let placeholder = $state<DateValue>(today(timeZone));

	const text = $derived({ ...defaultMessages, ...messages });
	const custom = $derived(value.preset === "custom");
	const customLabel = $derived(
		custom ? dayFormat.formatRange(value.start, value.end) : text.custom,
	);

	function commit(next: TimeRange) {
		value = next;
		onchange?.(next);
	}

	function choose(id: string) {
		const preset = presets.find((entry) => entry.id === id);
		if (preset && id !== value.preset) {
			commit(rangeFor(preset, new Date()));
		}
	}

	function resetDraft() {
		const end = toCalendarDate(fromDate(value.end, timeZone));
		draft = { start: toCalendarDate(fromDate(value.start, timeZone)), end };
		placeholder = desktop.current ? end.subtract({ months: 1 }) : end;
	}

	function apply() {
		if (!draft.start || !draft.end) {
			return;
		}
		commit({
			preset: "custom",
			start: draft.start.toDate(timeZone),
			end: new Date(draft.end.add({ days: 1 }).toDate(timeZone).getTime() - 1),
		});
		open = false;
	}

	const itemClass =
		"text-muted-foreground hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground h-11 rounded-full px-4 hover:bg-transparent data-[state=on]:shadow-sm md:h-8 md:px-3";
</script>

{#snippet calendar(months: number)}
	<RangeCalendar
		bind:value={draft}
		bind:placeholder
		numberOfMonths={months}
		maxValue={today(timeZone)}
		class="mx-auto"
	/>
{/snippet}

{#snippet actions()}
	<Button variant="outline" class="h-11 md:h-9" onclick={() => (open = false)}
		>{text.cancel}</Button
	>
	<Button
		class="h-11 md:h-9"
		disabled={!draft.start || !draft.end}
		onclick={apply}>{text.apply}</Button
	>
{/snippet}

<div class={cn("no-scrollbar w-full overflow-x-auto", className)}>
	<div class="bg-muted inline-flex items-center gap-1 rounded-full p-1">
		<ToggleGroup.Root
			type="single"
			spacing={1}
			aria-label={text.label}
			bind:value={() => value.preset, choose}
		>
			{#each presets as preset (preset.id)}
				<ToggleGroup.Item value={preset.id} class={itemClass}
					>{preset.label}</ToggleGroup.Item
				>
			{/each}
		</ToggleGroup.Root>
		{#if desktop.current}
			<Popover.Root bind:open>
				<Popover.Trigger
					class={cn(
						itemClass,
						"text-sm font-medium whitespace-nowrap",
						custom && "bg-background text-foreground shadow-sm",
					)}
					onclick={resetDraft}>{customLabel}</Popover.Trigger
				>
				<Popover.Content align="end" class="w-auto">
					<Popover.Header>
						<Popover.Title>{text.customTitle}</Popover.Title>
					</Popover.Header>
					{@render calendar(2)}
					<div class="flex justify-end gap-2">
						{@render actions()}
					</div>
				</Popover.Content>
			</Popover.Root>
		{:else}
			<button
				type="button"
				class={cn(
					itemClass,
					"text-sm font-medium whitespace-nowrap",
					custom && "bg-background text-foreground shadow-sm",
				)}
				aria-haspopup="dialog"
				onclick={() => {
					resetDraft();
					open = true;
				}}>{customLabel}</button
			>
			<Drawer.Root bind:open>
				<Drawer.Content>
					<Drawer.Header class="px-5 text-left">
						<Drawer.Title>{text.customTitle}</Drawer.Title>
					</Drawer.Header>
					<div class="px-5">
						{@render calendar(1)}
					</div>
					<Drawer.Footer class="pb-safe-bottom grid grid-cols-2 gap-2 px-5">
						{@render actions()}
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/if}
	</div>
</div>
