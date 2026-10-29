<script lang="ts">
	import BellIcon from "@lucide/svelte/icons/bell";
	import WalletIcon from "@lucide/svelte/icons/wallet";

	import StatCard from "#lib/components/blocks/stat-card.svelte";
</script>

<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
	<StatCard
		label="Balance"
		value="1 284 €"
		hint="This month"
		icon={WalletIcon}
	/>
	<StatCard
		label="Owed to you"
		value="312 €"
		icon={WalletIcon}
		tone="positive"
	/>
	<StatCard label="You owe" value="96 €" icon={WalletIcon} tone="warning" />
	<StatCard label="Alerts" value={3} href="#" icon={BellIcon} />
</div>
