<script lang="ts">
	import AuthShell from "#lib/components/blocks/auth-shell.svelte";
	import PasswordInput from "#lib/components/blocks/password-input.svelte";
	import Input from "#lib/components/kit/input.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
</script>

<AuthShell heading="Sign in" subheading="Welcome back.">
	{#snippet brand()}
		<div class="bg-primary glow size-12 rounded-2xl"></div>
	{/snippet}
	<form class="grid gap-5">
		<Input
			label="Email"
			name="email"
			type="email"
			autocomplete="email"
			required
		/>
		<PasswordInput label="Password" required />
		<Button type="submit" class="h-11">Sign in</Button>
	</form>
	{#snippet footer()}
		No account? Ask your admin for an invitation.
	{/snippet}
</AuthShell>
