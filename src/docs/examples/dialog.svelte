<script lang="ts">
	import { toast } from "svelte-sonner";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Dialog from "#lib/components/ui/dialog/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";

	let open = $state(false);

	function save(event: SubmitEvent) {
		event.preventDefault();
		open = false;
		toast.success("Project renamed.");
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Rename project</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content>
		<form class="grid gap-6" onsubmit={save}>
			<Dialog.Header>
				<Dialog.Title>Rename project</Dialog.Title>
				<Dialog.Description>
					Every member sees the new name right away.
				</Dialog.Description>
			</Dialog.Header>
			<Field.Field>
				<Field.Label for="project-name">Name</Field.Label>
				<Input id="project-name" value="Website redesign" />
			</Field.Field>
			<Dialog.Footer>
				<Dialog.Close>
					{#snippet child({ props })}
						<Button {...props} variant="outline">Cancel</Button>
					{/snippet}
				</Dialog.Close>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
