<script lang="ts">
	import { Button } from "#lib/components/ui/button/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import * as Sheet from "#lib/components/ui/sheet/index.js";

	let open = $state(false);
	let name = $state("Weekend in Lyon");
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Edit group</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Edit group</Sheet.Title>
			<Sheet.Description>
				Changes are visible to every member.
			</Sheet.Description>
		</Sheet.Header>
		<Field.Group class="px-4">
			<Field.Field>
				<Field.Label for="group-name">Name</Field.Label>
				<Input id="group-name" bind:value={name} />
			</Field.Field>
			<Field.Field>
				<Field.Label for="group-currency">Currency</Field.Label>
				<Input id="group-currency" value="EUR" />
			</Field.Field>
		</Field.Group>
		<Sheet.Footer>
			<Button onclick={() => (open = false)}>Save</Button>
			<Sheet.Close>
				{#snippet child({ props })}
					<Button {...props} variant="outline">Cancel</Button>
				{/snippet}
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
