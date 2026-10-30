<script lang="ts">
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { Switch } from "#lib/components/ui/switch/index.js";

	let estimate = $state("");
	const invalid = $derived(estimate !== "" && Number(estimate) <= 0);
</script>

<Field.Set>
	<Field.Legend>New task</Field.Legend>
	<Field.Description>Visible to everyone in the project.</Field.Description>
	<Field.Group class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<Field.Field>
			<Field.Label for="task-title">Title</Field.Label>
			<Input id="task-title" placeholder="Write the release notes" />
		</Field.Field>
		<Field.Field data-invalid={invalid}>
			<Field.Label for="task-estimate">Estimate</Field.Label>
			<Input
				id="task-estimate"
				type="number"
				placeholder="0"
				aria-invalid={invalid}
				bind:value={estimate}
			/>
			{#if invalid}
				<Field.Error>The estimate must be greater than zero.</Field.Error>
			{:else}
				<Field.Description>In hours.</Field.Description>
			{/if}
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Switch id="task-recurring" />
			<Field.Label for="task-recurring">Repeat every week</Field.Label>
		</Field.Field>
	</Field.Group>
</Field.Set>
