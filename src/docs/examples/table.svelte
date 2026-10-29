<script lang="ts">
	import * as Table from "#lib/components/ui/table/index.js";

	const files = [
		{ id: 1, name: "Roadmap.pdf", owner: "Alex", date: "Mar 12", size: 2.4 },
		{
			id: 2,
			name: "Brand assets.zip",
			owner: "Sam",
			date: "Mar 14",
			size: 118,
		},
		{ id: 3, name: "Notes.md", owner: "Lou", date: "Mar 15", size: 0.2 },
	];

	const total = files.reduce((sum, file) => sum + file.size, 0);
</script>

<Table.Root>
	<Table.Caption>Shared files, updated in March.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>File</Table.Head>
			<Table.Head>Owner</Table.Head>
			<Table.Head>Modified</Table.Head>
			<Table.Head class="text-right">Size</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each files as file (file.id)}
			<Table.Row>
				<Table.Cell class="font-medium">{file.name}</Table.Cell>
				<Table.Cell>{file.owner}</Table.Cell>
				<Table.Cell>{file.date}</Table.Cell>
				<Table.Cell class="text-right tabular">
					{file.size.toFixed(1)} MB
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell colspan={3}>Total</Table.Cell>
			<Table.Cell class="text-right tabular">{total.toFixed(1)} MB</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
