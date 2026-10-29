<script lang="ts">
	import { enhance } from "$app/forms";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { saveToast } from "#lib/toast.js";
</script>

<form
	method="POST"
	action="?/save"
	use:enhance={saveToast("Profile")}
	class="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"
>
	<Field.Field>
		<Field.Label for="toast-name">Name</Field.Label>
		<Input id="toast-name" name="name" value="Alex" />
		<Field.Description>Clear it to see the action's error.</Field.Description>
	</Field.Field>
	<Button type="submit">Save</Button>
</form>
