<script lang="ts">
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { Switch } from "#lib/components/ui/switch/index.js";

	let amount = $state("");
	const invalid = $derived(amount !== "" && Number(amount) <= 0);
</script>

<Field.Set>
	<Field.Legend>New expense</Field.Legend>
	<Field.Description>Split between everyone in the group.</Field.Description>
	<Field.Group class="grid gap-6 md:grid-cols-2">
		<Field.Field>
			<Field.Label for="expense-title">Title</Field.Label>
			<Input id="expense-title" placeholder="Groceries" />
		</Field.Field>
		<Field.Field data-invalid={invalid}>
			<Field.Label for="expense-amount">Amount</Field.Label>
			<Input
				id="expense-amount"
				type="number"
				placeholder="0.00"
				aria-invalid={invalid}
				bind:value={amount}
			/>
			{#if invalid}
				<Field.Error>The amount must be greater than zero.</Field.Error>
			{:else}
				<Field.Description>In euros.</Field.Description>
			{/if}
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Switch id="expense-recurring" />
			<Field.Label for="expense-recurring">Repeat every month</Field.Label>
		</Field.Field>
	</Field.Group>
</Field.Set>
