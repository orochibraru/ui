<script lang="ts">
	import { toast } from "svelte-sonner";

	import { Button } from "#lib/components/ui/button/index.js";

	function syncAccounts() {
		return new Promise((resolve) => setTimeout(resolve, 1500));
	}
</script>

<div class="flex flex-wrap items-center gap-2">
	<Button
		variant="outline"
		onclick={() => toast("Expense added to Lyon trip.")}
	>
		Default
	</Button>
	<Button
		variant="outline"
		onclick={() =>
			toast.success("Payment recorded.", {
				description: "Sam paid you 42.00 €.",
			})}
	>
		Success
	</Button>
	<Button
		variant="outline"
		onclick={() => toast.error("Couldn't reach the bank.")}
	>
		Error
	</Button>
	<Button
		variant="outline"
		onclick={() =>
			toast.promise(syncAccounts(), {
				loading: "Syncing accounts...",
				success: "Accounts up to date.",
				error: "Sync failed.",
			})}
	>
		Promise
	</Button>
</div>
