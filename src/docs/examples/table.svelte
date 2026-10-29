<script lang="ts">
	import * as Table from "#lib/components/ui/table/index.js";

	const expenses = [
		{ id: 1, label: "Groceries", paidBy: "Alex", date: "Mar 12", amount: 64.2 },
		{
			id: 2,
			label: "Train tickets",
			paidBy: "Sam",
			date: "Mar 14",
			amount: 118,
		},
		{ id: 3, label: "Dinner", paidBy: "Lou", date: "Mar 15", amount: 87.5 },
	];

	const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
</script>

<Table.Root>
	<Table.Caption>Weekend in Lyon, March expenses.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Expense</Table.Head>
			<Table.Head>Paid by</Table.Head>
			<Table.Head>Date</Table.Head>
			<Table.Head class="text-right">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each expenses as expense (expense.id)}
			<Table.Row>
				<Table.Cell class="font-medium">{expense.label}</Table.Cell>
				<Table.Cell>{expense.paidBy}</Table.Cell>
				<Table.Cell>{expense.date}</Table.Cell>
				<Table.Cell class="text-right tabular">
					{expense.amount.toFixed(2)} €
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
	<Table.Footer>
		<Table.Row>
			<Table.Cell colspan={3}>Total</Table.Cell>
			<Table.Cell class="text-right tabular">{total.toFixed(2)} €</Table.Cell>
		</Table.Row>
	</Table.Footer>
</Table.Root>
