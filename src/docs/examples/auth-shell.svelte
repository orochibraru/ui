<script lang="ts">
	import AuthShell from "#lib/components/blocks/auth-shell.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
</script>

<AuthShell heading="Sign in" subheading="Welcome back.">
	{#snippet brand()}
		<div class="bg-primary glow size-12 rounded-2xl"></div>
	{/snippet}
	<form class="grid gap-4">
		<Field.Field>
			<Field.Label for="auth-email">Email</Field.Label>
			<Input id="auth-email" type="email" autocomplete="email" />
		</Field.Field>
		<Button type="submit" class="h-11">Continue</Button>
	</form>
	{#snippet footer()}
		No account? Ask your admin.
	{/snippet}
</AuthShell>
