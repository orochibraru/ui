<script lang="ts">
	import { toast } from "svelte-sonner";

	import OtpField from "#lib/components/blocks/otp-field.svelte";
	import * as Field from "#lib/components/ui/field/index.js";
</script>

<Field.Field>
	<Field.Label for="otp-code">Code from your authenticator app</Field.Label>
	<OtpField id="otp-code" oncomplete={(code) => toast(`Verifying ${code}.`)} />
</Field.Field>
