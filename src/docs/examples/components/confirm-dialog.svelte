<script lang="ts">
	import ConfirmDialog from "#lib/components/kit/confirm-dialog.svelte";
	import { Button } from "#lib/components/ui/button/index.js";

	let archiveOpen = $state(false);
	let deleteOpen = $state(false);
	let status = $state("3 files in this folder");

	function wait(milliseconds: number) {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	}
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button
		variant="outline"
		class="h-11 rounded-xl md:h-9"
		onclick={() => (archiveOpen = true)}
	>
		Archive project
	</Button>
	<Button
		variant="destructive"
		class="h-11 rounded-xl md:h-9"
		onclick={() => (deleteOpen = true)}
	>
		Delete folder
	</Button>
	<p class="text-muted-foreground text-sm">{status}</p>
</div>

<ConfirmDialog
	bind:open={archiveOpen}
	title="Archive this project?"
	description="Members keep read access. You can restore it later."
	confirmLabel="Archive"
	onconfirm={() => (status = "Project archived")}
/>

<ConfirmDialog
	bind:open={deleteOpen}
	title="Delete this folder?"
	description="The folder and its 3 files are removed for every member."
	confirmLabel="Delete"
	destructive
	onconfirm={async () => {
		await wait(1500);
		status = "Folder deleted";
	}}
/>
