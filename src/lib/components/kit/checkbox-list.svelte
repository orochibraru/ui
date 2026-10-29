<script lang="ts">
	import { Checkbox } from "#lib/components/ui/checkbox/index.js";
	import { cn } from "#lib/utils.js";

	import { errorList, type FieldProps } from "./field-frame.svelte";
	import FieldsetFrame from "./fieldset-frame.svelte";

	interface Option {
		value: string;
		label: string;
		description?: string;
		disabled?: boolean;
	}

	type Props = FieldProps & {
		options: readonly Option[];
		value?: string[];
		orientation?: "vertical" | "horizontal";
	};

	let {
		options,
		value = $bindable([]),
		orientation = "vertical",
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
	const listId = $derived(id ?? generatedId);
	const invalid = $derived(errorList(error).length > 0);

	function setChecked(optionValue: string, checked: boolean) {
		value = checked
			? [...value, optionValue]
			: value.filter((entry) => entry !== optionValue);
	}
</script>

<FieldsetFrame
	id={listId}
	{label}
	{description}
	{error}
	{required}
	{disabled}
	class={className}
>
	<div
		class={cn(
			"flex",
			orientation === "horizontal" ? "flex-row flex-wrap gap-x-6" : "flex-col",
		)}
	>
		{#each options as option, index (option.value)}
			{@const optionId = `${listId}-${index}`}
			<div
				class="group/row relative flex min-h-11 items-start gap-3 py-2.5 has-disabled:opacity-50"
			>
				<Checkbox
					id={optionId}
					{name}
					value={option.value}
					disabled={disabled || option.disabled}
					bind:checked={
						() => value.includes(option.value),
						(checked) => setChecked(option.value, checked)
					}
					aria-invalid={invalid || undefined}
					aria-describedby={option.description
						? `${optionId}-description`
						: undefined}
					class="z-10 size-5"
				/>
				<span class="min-w-0 flex-1">
					<label
						for={optionId}
						class="block cursor-pointer text-sm leading-snug font-medium after:absolute after:inset-0 group-has-disabled/row:cursor-not-allowed"
						>{option.label}</label
					>
					{#if option.description}
						<span
							id="{optionId}-description"
							class="text-muted-foreground mt-0.5 block text-sm"
							>{option.description}</span
						>
					{/if}
				</span>
			</div>
		{/each}
	</div>
</FieldsetFrame>
