<script lang="ts">
	interface Props {
		entries: { name: string; color: string }[];
		kind: "line" | "area" | "bar";
	}

	const { entries, kind }: Props = $props();
</script>

<ul class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
	{#each entries as entry, index (index)}
		<li class="flex items-center gap-2">
			<span
				aria-hidden="true"
				class="shrink-0 {kind === 'line'
					? 'h-0.5 w-4 rounded-full'
					: 'size-2.5 rounded-[3px]'}"
				style:background-color={entry.color}
			></span>
			{entry.name}
		</li>
	{/each}
</ul>
