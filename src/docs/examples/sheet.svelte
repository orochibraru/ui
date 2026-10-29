<script lang="ts">
	import { Button } from "#lib/components/ui/button/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import * as Sheet from "#lib/components/ui/sheet/index.js";

	let open = $state(false);
	let name = $state("Alex Martin");
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Edit profile</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Edit profile</Sheet.Title>
			<Sheet.Description>Changes are visible to your team.</Sheet.Description>
		</Sheet.Header>
		<Field.Group class="px-4">
			<Field.Field>
				<Field.Label for="profile-name">Name</Field.Label>
				<Input id="profile-name" bind:value={name} />
			</Field.Field>
			<Field.Field>
				<Field.Label for="profile-email">Email</Field.Label>
				<Input id="profile-email" value="alex@example.com" />
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
