<script lang="ts">
	import type { Component } from "svelte";

	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";

	import { errorList, type FieldProps } from "./field-frame.svelte";
	import FieldsetFrame from "./fieldset-frame.svelte";
	import Segment from "./segmented-control/segment.svelte";

	interface Option {
		value: string;
		label: string;
		icon?: Component<{ class?: string }>;
	}

	type Props = FieldProps & {
		options: readonly Option[];
		value?: string;
	};

	let {
		options,
		value = $bindable(""),
		name,
		label,
		description,
		error,
		required = false,
		disabled = false,
		id,
		class: className,
	}: Props = $props();

	const generatedId = $props.id();
	const controlId = $derived(id ?? generatedId);
	const invalid = $derived(errorList(error).length > 0);
</script>

<FieldsetFrame
	id={controlId}
	{label}
	{description}
	{error}
	{required}
	{disabled}
	class={className}
>
	<Tooltip.Provider>
		<ToggleGroup.Root
			type="single"
			bind:value={
				() => value,
				(next) => {
					if (typeof next === "string" && next) value = next;
				}
			}
			spacing={2}
			{disabled}
			aria-labelledby={label ? `${controlId}-label` : undefined}
			aria-invalid={invalid || undefined}
			class="w-full"
		>
			{#each options as option (option.value)}
				<Segment value={option.value} label={option.label} icon={option.icon} />
			{/each}
		</ToggleGroup.Root>
	</Tooltip.Provider>
	<input type="hidden" {name} {value} {disabled} />
</FieldsetFrame>
