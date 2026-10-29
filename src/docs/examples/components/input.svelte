<script lang="ts">
	import Input from "#lib/components/kit/input.svelte";

	let email = $state("");
</script>

<div class="grid gap-4 md:grid-cols-2">
	<Input
		label="Email"
		name="email"
		type="email"
		autocomplete="email"
		required
		description="We send the sign-in link here."
		bind:value={email}
	/>
	<Input label="Password" name="password" type="password" />
	<Input label="Project name" name="project" error="This name is taken." />
	<Input label="Read only" value="acme-workspace" disabled />
</div>
