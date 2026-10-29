<script lang="ts">
	import { toast } from "svelte-sonner";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";

	const members = [
		{ name: "Alex", amount: "42,00 €" },
		{ name: "Sam", amount: "17,50 €" },
		{ name: "Jordan", amount: "8,20 €" },
	];

	let open = $state(false);

	function settle() {
		open = false;
		toast.success("Balances settled.");
	}
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Settle up</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Settle up</Drawer.Title>
			<Drawer.Description>Lisbon trip · you are owed 67,70 €</Drawer.Description
			>
		</Drawer.Header>
		<ul class="divide-y px-4">
			{#each members as member (member.name)}
				<li class="flex justify-between py-3">
					<span>{member.name}</span>
					<span class="tabular-nums">{member.amount}</span>
				</li>
			{/each}
		</ul>
		<Drawer.Footer>
			<Button onclick={settle}>Mark all as paid</Button>
			<Drawer.Close>
				{#snippet child({ props })}
					<Button {...props} variant="outline">Cancel</Button>
				{/snippet}
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
