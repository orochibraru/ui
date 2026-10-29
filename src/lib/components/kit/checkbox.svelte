<script lang="ts">
	import { Checkbox } from "#lib/components/ui/checkbox/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import { cn } from "#lib/utils.js";

	import { errorList, type FieldProps } from "./field-frame.svelte";

	type Props = FieldProps & {
		checked?: boolean;
	};

	let {
		checked = $bindable(false),
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
	const checkboxId = $derived(id ?? generatedId);
	const errors = $derived(errorList(error));
	const invalid = $derived(errors.length > 0);
	const describedBy = $derived(
		invalid
			? `${checkboxId}-error`
			: description
				? `${checkboxId}-description`
				: undefined,
	);
</script>

<div
	class={cn("flex w-full flex-col", className)}
	data-invalid={invalid || undefined}
>
	<div
		class="group/row relative flex min-h-11 items-start gap-3 py-2.5 has-disabled:opacity-50"
	>
		<Checkbox
			id={checkboxId}
			{name}
			{required}
			{disabled}
			bind:checked
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			class="z-10 size-5"
		/>
		<span class="min-w-0 flex-1">
			{#if label}
				<label
					for={checkboxId}
					class={cn(
						"block cursor-pointer text-sm leading-snug font-medium after:absolute after:inset-0 group-has-disabled/row:cursor-not-allowed",
						invalid && "text-destructive",
					)}
				>
					{label}
					{#if required}
						<span class="text-destructive" aria-hidden="true">*</span>
					{/if}
				</label>
			{/if}
			{#if description && !invalid}
				<span
					id="{checkboxId}-description"
					class="text-muted-foreground mt-0.5 block text-sm">{description}</span
				>
			{/if}
		</span>
	</div>
	{#if invalid}
		<Field.Error
			id="{checkboxId}-error"
			class="pl-8"
			errors={errors.map((message) => ({ message }))}
		/>
	{/if}
</div>
