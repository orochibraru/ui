<script lang="ts">
	interface Props {
		caption: string;
		dateHeading: string;
		names: string[];
		rows: { time: number; date: string; values: string[] }[];
		visible: boolean;
		id: string;
	}

	const { caption, dateHeading, names, rows, visible, id }: Props = $props();
</script>

<div
	{id}
	class={visible ? "mt-3 max-h-72 overflow-auto rounded-xl border" : "sr-only"}
>
	<table class="w-full text-sm">
		<caption class="sr-only">{caption}</caption>
		<thead class="bg-muted sticky top-0">
			<tr>
				<th scope="col" class="px-3 py-2 text-left font-medium"
					>{dateHeading}</th
				>
				{#each names as name, index (index)}
					<th scope="col" class="px-3 py-2 text-right font-medium">{name}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.time)}
				<tr class="border-t">
					<th scope="row" class="px-3 py-1.5 text-left font-normal"
						>{row.date}</th
					>
					{#each row.values as value, index (index)}
						<td class="px-3 py-1.5 text-right tabular">{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
