<script lang="ts">
	import AuthShell from "#lib/components/blocks/auth-shell.svelte";
	import NewPasswordFields from "#lib/components/blocks/new-password-fields.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
</script>

<AuthShell
	heading="Set a new password"
	subheading="Pick something you don't use anywhere else."
>
	{#snippet brand()}
		<div class="bg-primary glow size-12 rounded-2xl"></div>
	{/snippet}
	<div class="grid gap-6">
		<Field.Group>
			<NewPasswordFields email="alex@example.com" />
		</Field.Group>
		<Button class="h-11">Save the password</Button>
	</div>
</AuthShell>
