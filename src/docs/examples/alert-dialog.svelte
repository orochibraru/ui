<script lang="ts">
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import { toast } from "svelte-sonner";

	import * as AlertDialog from "#lib/components/ui/alert-dialog/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="destructive">Delete project</Button>
		{/snippet}
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Media>
				<Trash2Icon />
			</AlertDialog.Media>
			<AlertDialog.Title>Delete "Website redesign"?</AlertDialog.Title>
			<AlertDialog.Description>
				The project and its 48 files are deleted for every member. This can't be
				undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				variant="destructive"
				onclick={() => toast.success("Project deleted.")}
			>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
