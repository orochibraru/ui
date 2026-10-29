<script lang="ts">
	import * as Field from "#lib/components/ui/field/index.js";
	import { Switch } from "#lib/components/ui/switch/index.js";
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
	const switchId = $derived(id ?? generatedId);
	const errors = $derived(errorList(error));
	const invalid = $derived(errors.length > 0);
	const describedBy = $derived(
		invalid
			? `${switchId}-error`
			: description
				? `${switchId}-description`
				: undefined,
	);
</script>

<div
	class={cn("flex w-full flex-col", className)}
	data-invalid={invalid || undefined}
>
	<div
		class="group/row relative flex min-h-11 items-start justify-between gap-4 py-2.5 has-disabled:opacity-50"
	>
		<span class="min-w-0 flex-1">
			{#if label}
				<label
					for={switchId}
					class={cn(
						"block cursor-pointer font-medium after:absolute after:inset-0 group-has-disabled/row:cursor-not-allowed",
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
					id="{switchId}-description"
					class="text-muted-foreground mt-0.5 block text-sm">{description}</span
				>
			{/if}
		</span>
		<Switch
			id={switchId}
			{name}
			value="true"
			{required}
			{disabled}
			bind:checked
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			class="z-10 mt-0.5 shrink-0"
		/>
	</div>
	{#if invalid}
		<Field.Error
			id="{switchId}-error"
			errors={errors.map((message) => ({ message }))}
		/>
	{/if}
</div>
