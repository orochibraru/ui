<script lang="ts">
	import { Checkbox } from "#lib/components/ui/checkbox/index.js";
	import * as Field from "#lib/components/ui/field/index.js";

	let notify = $state(true);
</script>

<Field.Group>
	<Field.Field orientation="horizontal">
		<Checkbox id="notify" bind:checked={notify} />
		<Field.Label for="notify">Email me when an expense is added</Field.Label>
	</Field.Field>
	<Field.Field orientation="horizontal">
		<Checkbox id="weekly" />
		<Field.Content>
			<Field.Label for="weekly">Weekly digest</Field.Label>
			<Field.Description>A summary of balances every Monday.</Field.Description>
		</Field.Content>
	</Field.Field>
	<Field.Field orientation="horizontal">
		<Checkbox id="split" indeterminate />
		<Field.Label for="split">Split with everyone</Field.Label>
	</Field.Field>
	<Field.Field orientation="horizontal" data-disabled>
		<Checkbox id="archived" disabled />
		<Field.Label for="archived">Include archived groups</Field.Label>
	</Field.Field>
</Field.Group>
