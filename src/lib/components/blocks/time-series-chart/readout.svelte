<script lang="ts">
	interface Row {
		name: string;
		color: string;
		value: string;
	}

	interface Props {
		label: string;
		rows: Row[];
		placement: "floating" | "above";
		x: number;
		width: number;
	}

	const { label, rows, placement, x, width }: Props = $props();

	const flip = $derived(x > width / 2);
</script>

<div
	data-readout
	aria-hidden="true"
	class="bg-popover text-popover-foreground pointer-events-none absolute z-10 rounded-xl border px-3 py-2 text-xs shadow-md {placement ===
	'above'
		? 'inset-x-0 bottom-full mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1'
		: 'top-0 grid gap-1 whitespace-nowrap'}"
	style:left={placement === "floating" && !flip ? `${x + 12}px` : undefined}
	style:right={placement === "floating" && flip
		? `${width - x + 12}px`
		: undefined}
>
	<p class="text-muted-foreground">{label}</p>
	{#each rows as row, index (index)}
		<p class="flex items-center gap-2">
			<span
				class="h-0.5 w-3 shrink-0 rounded-full"
				style:background-color={row.color}
			></span>
			<span class="font-semibold tabular">{row.value}</span>
			<span class="text-muted-foreground">{row.name}</span>
		</p>
	{/each}
</div>
