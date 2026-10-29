<script lang="ts">
	import PasswordInput from "#lib/components/blocks/password-input.svelte";
	import * as Field from "#lib/components/ui/field/index.js";
</script>

<Field.Field>
	<Field.Label for="sign-in-password">Password</Field.Label>
	<PasswordInput id="sign-in-password" required />
</Field.Field>
