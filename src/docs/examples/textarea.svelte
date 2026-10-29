<script lang="ts">
	import * as Field from "#lib/components/ui/field/index.js";
	import { Textarea } from "#lib/components/ui/textarea/index.js";

	let note = $state("");
</script>

<Field.Group>
	<Field.Field>
		<Field.Label for="expense-note">Note</Field.Label>
		<Textarea
			id="expense-note"
			bind:value={note}
			maxlength={200}
			placeholder="What was it for?"
		/>
		<Field.Description>{note.length} / 200 characters</Field.Description>
	</Field.Field>
	<Field.Field>
		<Field.Label for="archived-note">Archived note</Field.Label>
		<Textarea id="archived-note" value="Paid back in March." disabled />
	</Field.Field>
</Field.Group>
