<script lang="ts">
	import * as Tabs from "#lib/components/ui/tabs/index.js";

	let tab = $state("expenses");
</script>

<div class="grid gap-8">
	<Tabs.Root bind:value={tab}>
		<Tabs.List>
			<Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
			<Tabs.Trigger value="balances">Balances</Tabs.Trigger>
			<Tabs.Trigger value="members">Members</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="expenses" class="text-sm">
			23 expenses, 1 284.60 € in total.
		</Tabs.Content>
		<Tabs.Content value="balances" class="text-sm">
			Sam owes you 42.00 €.
		</Tabs.Content>
		<Tabs.Content value="members" class="text-sm">
			Alex, Sam, Lou and you.
		</Tabs.Content>
	</Tabs.Root>
	<Tabs.Root value="week">
		<Tabs.List variant="line">
			<Tabs.Trigger value="week">This week</Tabs.Trigger>
			<Tabs.Trigger value="month">This month</Tabs.Trigger>
			<Tabs.Trigger value="year" disabled>This year</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</div>
