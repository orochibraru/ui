<script lang="ts">
	import Checkbox from "#lib/components/kit/checkbox.svelte";

	let digest = $state(true);
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
	<Checkbox
		label="Weekly digest"
		name="digest"
		description="A summary of the week's activity, every Monday."
		bind:checked={digest}
	/>
	<Checkbox
		label="I accept the terms"
		name="terms"
		required
		error="Accept the terms to continue."
	/>
	<Checkbox label="Product announcements" name="announcements" disabled />
</div>
