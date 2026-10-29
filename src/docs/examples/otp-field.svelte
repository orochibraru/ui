<script lang="ts">
	import { toast } from "svelte-sonner";

	import AuthShell from "#lib/components/blocks/auth-shell.svelte";
	import OtpField from "#lib/components/blocks/otp-field.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
</script>

<AuthShell
	heading="Check your phone"
	subheading="Enter the code from your authenticator app."
>
	{#snippet brand()}
		<div class="bg-primary glow size-12 rounded-2xl"></div>
	{/snippet}
	<div class="flex flex-col items-center gap-6">
		<OtpField
			label="6-digit code"
			align="center"
			oncomplete={(code) => toast(`Verifying ${code}.`)}
		/>
		<Button variant="link">Use a backup code instead</Button>
	</div>
</AuthShell>
