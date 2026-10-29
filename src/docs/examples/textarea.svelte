<script lang="ts">
	import * as Field from "#lib/components/ui/field/index.js";
	import { Textarea } from "#lib/components/ui/textarea/index.js";

	let message = $state("");
</script>

<Field.Group>
	<Field.Field>
		<Field.Label for="message">Message</Field.Label>
		<Textarea
			id="message"
			bind:value={message}
			maxlength={200}
			placeholder="Write a message..."
		/>
		<Field.Description>{message.length} / 200 characters</Field.Description>
	</Field.Field>
	<Field.Field>
		<Field.Label for="archived-message">Archived message</Field.Label>
		<Textarea id="archived-message" value="This thread is closed." disabled />
	</Field.Field>
</Field.Group>
