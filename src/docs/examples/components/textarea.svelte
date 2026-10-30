<script lang="ts">
	import Textarea from "#lib/components/kit/textarea.svelte";

	let bio = $state("");
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<Textarea
		label="Bio"
		name="bio"
		maxlength={160}
		description="Shown on your public profile."
		bind:value={bio}
	/>
	<Textarea label="Notes" name="notes" rows={4} />
	<Textarea
		label="Feedback"
		name="feedback"
		required
		error="Tell us a little more."
	/>
	<Textarea label="Read only" value="Archived on import." disabled />
</div>
