<script lang="ts">
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import { MediaQuery } from "svelte/reactivity";

	import { Button } from "#lib/components/ui/button/index.js";
	import { cn } from "#lib/utils.js";

	const defaultMessages = {
		label: "Pagination",
		previous: "Previous",
		next: "Next",
		pageOf: (page: number, pageCount: number) => `Page ${page} of ${pageCount}`,
		range: (first: number, last: number, total: number) =>
			`${first}–${last} of ${total}`,
	};

	interface Props {
		page?: number;
		total: number;
		perPage?: number;
		onchange?: (page: number) => void;
		href?: (page: number) => string;
		class?: string;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		page = $bindable(1),
		total,
		perPage = 20,
		onchange,
		href,
		class: className,
		messages = {},
	}: Props = $props();

	const desktop = new MediaQuery("(min-width: 768px)");
	const text = $derived({ ...defaultMessages, ...messages });

	const pageCount = $derived(Math.max(1, Math.ceil(total / perPage)));
	const first = $derived(total === 0 ? 0 : (page - 1) * perPage + 1);
	const last = $derived(Math.min(page * perPage, total));

	const pages = $derived.by<(number | "gap")[]>(() => {
		if (pageCount <= 7) {
			return Array.from({ length: pageCount }, (_, index) => index + 1);
		}
		if (page <= 4) {
			return [1, 2, 3, 4, 5, "gap", pageCount];
		}
		if (page >= pageCount - 3) {
			return [
				1,
				"gap",
				...Array.from({ length: 5 }, (_, index) => pageCount - 4 + index),
			];
		}
		return [1, "gap", page - 1, page, page + 1, "gap", pageCount];
	});

	function go(next: number) {
		if (next < 1 || next > pageCount || next === page) {
			return;
		}
		page = next;
		onchange?.(next);
	}
</script>

{#if total > perPage}
	<nav
		aria-label={text.label}
		class={cn("flex w-full items-center justify-between gap-3", className)}
	>
		{#if desktop.current}
			<p class="text-muted-foreground text-sm tabular-nums">
				{text.range(first, last, total)}
			</p>
		{/if}
		<div
			class="flex w-full items-center justify-between gap-1 md:w-auto md:justify-end"
		>
			<Button
				variant="outline"
				class="h-11 rounded-xl md:h-9"
				href={href?.(page - 1)}
				disabled={page <= 1}
				onclick={() => go(page - 1)}
			>
				<ChevronLeftIcon />
				{text.previous}
			</Button>
			{#if desktop.current}
				{#each pages as entry, index (index)}
					{#if entry === "gap"}
						<span
							aria-hidden="true"
							class="text-muted-foreground flex size-9 items-center justify-center"
						>
							<EllipsisIcon class="size-4" />
						</span>
					{:else}
						<Button
							variant={entry === page ? "outline" : "ghost"}
							size="icon"
							class="tabular-nums"
							href={href?.(entry)}
							aria-current={entry === page ? "page" : undefined}
							onclick={() => go(entry)}
						>
							{entry}
						</Button>
					{/if}
				{/each}
			{:else}
				<span class="text-muted-foreground text-sm tabular-nums">
					{text.pageOf(page, pageCount)}
				</span>
			{/if}
			<Button
				variant="outline"
				class="h-11 rounded-xl md:h-9"
				href={href?.(page + 1)}
				disabled={page >= pageCount}
				onclick={() => go(page + 1)}
			>
				{text.next}
				<ChevronRightIcon />
			</Button>
		</div>
	</nav>
{/if}
