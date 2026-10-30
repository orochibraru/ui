<script lang="ts">
	import { enhance } from "$app/forms";

	import Input from "#lib/components/kit/input.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
	import { saveToast } from "#lib/toast.js";
</script>

<form
	method="POST"
	action="?/save"
	use:enhance={saveToast("Profile")}
	class="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-end"
>
	<Input
		label="Name"
		name="name"
		value="Alex"
		description="Clear it to see the action's error."
	/>
	<Button type="submit" class="h-11">Save</Button>
</form>
