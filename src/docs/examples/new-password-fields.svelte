<script lang="ts">
	import NewPasswordFields from "#lib/components/blocks/new-password-fields.svelte";
	import * as Field from "#lib/components/ui/field/index.js";
</script>

<Field.Group>
	<NewPasswordFields email="alex@example.com" />
</Field.Group>
