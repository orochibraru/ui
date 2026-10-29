<script lang="ts" module>
	export type DataTableColumn<Row extends object> = {
		[Key in keyof Row & string]: {
			key: Key;
			label: string;
			align?: "left" | "center" | "right";
			format?: (value: Row[Key], row: Row) => string;
			sortable?: boolean;
			hideOnMobile?: boolean;
		};
	}[keyof Row & string];

	function isMissing(value: unknown): boolean {
		return value === null || value === undefined;
	}

	function compareValues(left: unknown, right: unknown): number {
		if (typeof left === "number" && typeof right === "number") {
			return left - right;
		}
		if (left instanceof Date && right instanceof Date) {
			return left.getTime() - right.getTime();
		}
		return String(left).localeCompare(String(right), undefined, {
			numeric: true,
		});
	}
</script>

<script lang="ts" generics="Row extends object">
	import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import type { Snippet } from "svelte";

	import { Skeleton } from "#lib/components/ui/skeleton/index.js";
	import * as Table from "#lib/components/ui/table/index.js";
	import { cn } from "#lib/utils.js";

	const defaultMessages = {
		empty: "Nothing here yet.",
	};

	interface Props {
		columns: DataTableColumn<Row>[];
		rows: Row[];
		cell?: Snippet<[Row, DataTableColumn<Row>, string]>;
		rowHref?: (row: Row) => string;
		onrowclick?: (row: Row) => void;
		loading?: boolean;
		messages?: Partial<typeof defaultMessages>;
		class?: string;
	}

	const {
		columns,
		rows,
		cell,
		rowHref,
		onrowclick,
		loading = false,
		messages = {},
		class: className,
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
	const interactive = $derived(Boolean(rowHref || onrowclick));
	const firstColumn = $derived(columns[0]);
	const detailColumns = $derived(
		columns.slice(1).filter((column) => !column.hideOnMobile),
	);
	const placeholders = [0, 1, 2, 3, 4];
	const alignment = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
	};
	const raisedControls =
		"[&_a]:relative [&_a]:z-10 [&_button]:relative [&_button]:z-10";

	let sortKey = $state<keyof Row & string>();
	let descending = $state(false);

	const sortedRows = $derived.by(() => {
		const key = sortKey;
		if (key === undefined) {
			return rows;
		}
		return rows.toSorted((left, right) => {
			const leftValue = left[key];
			const rightValue = right[key];
			if (isMissing(leftValue) || isMissing(rightValue)) {
				return Number(isMissing(leftValue)) - Number(isMissing(rightValue));
			}
			const order = compareValues(leftValue, rightValue);
			return descending ? -order : order;
		});
	});

	function toggleSort(key: keyof Row & string) {
		if (sortKey === key) {
			descending = !descending;
			return;
		}
		sortKey = key;
		descending = false;
	}

	function display(row: Row, column: DataTableColumn<Row>): string {
		const value = row[column.key];
		const format = column.format as
			((value: unknown, row: Row) => string) | undefined;
		if (format) {
			return format(value, row);
		}
		return isMissing(value) ? "–" : String(value);
	}

	function ariaSort(column: DataTableColumn<Row>) {
		if (!column.sortable || sortKey !== column.key) {
			return undefined;
		}
		return descending ? "descending" : "ascending";
	}
</script>

{#snippet content(row: Row, column: DataTableColumn<Row>)}
	{#if cell}
		{@render cell(row, column, display(row, column))}
	{:else}
		{display(row, column)}
	{/if}
{/snippet}

{#snippet primary(row: Row, column: DataTableColumn<Row>)}
	{#if rowHref}
		<a
			href={rowHref(row)}
			class="font-medium outline-none after:absolute after:inset-0 after:rounded-[inherit] focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
		>
			{@render content(row, column)}
		</a>
	{:else if onrowclick}
		<button
			type="button"
			onclick={() => onrowclick(row)}
			class="text-left font-medium outline-none after:absolute after:inset-0 after:rounded-[inherit] focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
		>
			{@render content(row, column)}
		</button>
	{:else}
		<span class="font-medium">{@render content(row, column)}</span>
	{/if}
{/snippet}

{#if !loading && rows.length === 0}
	<p
		class={cn(
			"glass text-muted-foreground w-full rounded-2xl px-4 py-10 text-center text-sm",
			className,
		)}
	>
		{text.empty}
	</p>
{:else}
	<div class={cn("w-full", className)} aria-busy={loading || undefined}>
		<div class="glass hidden overflow-hidden rounded-2xl md:block">
			<Table.Root>
				<Table.Header>
					<Table.Row class="hover:bg-transparent">
						{#each columns as column, index (index)}
							<Table.Head
								aria-sort={ariaSort(column)}
								class={cn(
									"text-muted-foreground h-11 px-4 text-xs",
									alignment[column.align ?? "left"],
								)}
							>
								{#if column.sortable}
									<button
										type="button"
										onclick={() => toggleSort(column.key)}
										class="hover:text-foreground focus-visible:ring-ring/50 inline-flex items-center gap-1 rounded-sm font-medium outline-none focus-visible:ring-3"
									>
										{column.label}
										{#if sortKey !== column.key}
											<ChevronsUpDownIcon class="size-3.5 opacity-50" />
										{:else if descending}
											<ArrowDownIcon class="size-3.5" />
										{:else}
											<ArrowUpIcon class="size-3.5" />
										{/if}
									</button>
								{:else}
									{column.label}
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#if loading}
						{#each placeholders as placeholder (placeholder)}
							<Table.Row class="hover:bg-transparent">
								{#each columns as column, index (index)}
									<Table.Cell class="px-4 py-3">
										<Skeleton class="h-4 w-full" />
									</Table.Cell>
								{/each}
							</Table.Row>
						{/each}
					{:else}
						{#each sortedRows as row, rowIndex (rowIndex)}
							<Table.Row
								class={cn(
									"relative",
									interactive ? "cursor-pointer" : "hover:bg-transparent",
								)}
							>
								{#each columns as column, index (index)}
									<Table.Cell
										class={cn(
											"tabular px-4 py-3",
											alignment[column.align ?? "left"],
											index > 0 && raisedControls,
										)}
									>
										{#if index === 0}
											{@render primary(row, column)}
										{:else}
											{@render content(row, column)}
										{/if}
									</Table.Cell>
								{/each}
							</Table.Row>
						{/each}
					{/if}
				</Table.Body>
			</Table.Root>
		</div>

		<ul class="flex flex-col gap-3 md:hidden">
			{#if loading}
				{#each placeholders as placeholder (placeholder)}
					<li class="glass flex flex-col gap-3 rounded-2xl p-4">
						<Skeleton class="h-5 w-1/2" />
						<Skeleton class="h-4 w-full" />
					</li>
				{/each}
			{:else if firstColumn}
				{#each sortedRows as row, rowIndex (rowIndex)}
					<li class="glass relative flex flex-col gap-2 rounded-2xl p-4">
						<div class="min-w-0 wrap-break-word">
							{@render primary(row, firstColumn)}
						</div>
						{#if detailColumns.length > 0}
							<dl class="flex flex-col gap-1.5 text-sm">
								{#each detailColumns as column, index (index)}
									<div class="flex items-baseline justify-between gap-4">
										<dt class="text-muted-foreground shrink-0">
											{column.label}
										</dt>
										<dd
											class={cn(
												"tabular min-w-0 text-right wrap-break-word",
												raisedControls,
											)}
										>
											{@render content(row, column)}
										</dd>
									</div>
								{/each}
							</dl>
						{/if}
					</li>
				{/each}
			{/if}
		</ul>
	</div>
{/if}
