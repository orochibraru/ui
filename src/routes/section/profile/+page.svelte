<script lang="ts">
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
</script>

<Field.Group>
	<Field.Field>
		<Field.Label for="name">Name</Field.Label>
		<Input id="name" value="Alex" />
	</Field.Field>
	<Field.Field>
		<Field.Label for="profile-email">Email</Field.Label>
		<Input id="profile-email" type="email" value="alex@example.com" />
	</Field.Field>
</Field.Group>
