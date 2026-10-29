<script lang="ts">
	import { toast } from "svelte-sonner";

	import { Button } from "#lib/components/ui/button/index.js";

	function syncFiles() {
		return new Promise((resolve) => setTimeout(resolve, 1500));
	}
</script>

<div class="flex flex-wrap items-center gap-2">
	<Button variant="outline" onclick={() => toast("File uploaded.")}>
		Default
	</Button>
	<Button
		variant="outline"
		onclick={() =>
			toast.success("Invite sent.", {
				description: "Sam will get an email shortly.",
			})}
	>
		Success
	</Button>
	<Button
		variant="outline"
		onclick={() => toast.error("Couldn't reach the server.")}
	>
		Error
	</Button>
	<Button
		variant="outline"
		onclick={() =>
			toast.promise(syncFiles(), {
				loading: "Syncing files...",
				success: "Files up to date.",
				error: "Sync failed.",
			})}
	>
		Promise
	</Button>
</div>
