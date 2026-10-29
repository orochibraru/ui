<script lang="ts">
	import * as Select from "#lib/components/ui/select/index.js";

	const currencies = [
		{ value: "eur", label: "Euro (EUR)" },
		{ value: "usd", label: "US dollar (USD)" },
		{ value: "gbp", label: "Pound sterling (GBP)" },
		{ value: "chf", label: "Swiss franc (CHF)" },
	];

	let currency = $state("");
	const label = $derived(
		currencies.find((c) => c.value === currency)?.label ?? "Pick a currency",
	);
</script>

<Select.Root type="single" bind:value={currency}>
	<Select.Trigger class="w-56">{label}</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Currencies</Select.Label>
			{#each currencies as c (c.value)}
				<Select.Item value={c.value} label={c.label}>{c.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
