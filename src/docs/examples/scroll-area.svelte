<script lang="ts">
	import { ScrollArea } from "#lib/components/ui/scroll-area/index.js";
	import { Separator } from "#lib/components/ui/separator/index.js";

	const expenses = Array.from({ length: 30 }, (_, i) => ({
		id: i + 1,
		title: ["Groceries", "Rent", "Fuel", "Restaurant", "Internet"][i % 5],
		amount: ((i * 37) % 120) + 8,
	}));
</script>

<ScrollArea class="h-72 rounded-md border">
	<div class="p-4">
		<h4 class="mb-4 text-sm font-medium">Expenses</h4>
		{#each expenses as expense (expense.id)}
			<div class="flex justify-between text-sm">
				<span>{expense.title}</span>
				<span class="text-muted-foreground">{expense.amount} €</span>
			</div>
			<Separator class="my-2" />
		{/each}
	</div>
</ScrollArea>
