<script lang="ts">
	import type { Snippet } from "svelte";

	import * as Field from "#lib/components/ui/field/index.js";
	import { cn } from "#lib/utils.js";

	import { errorList } from "./field-frame.svelte";

	interface Props {
		id: string;
		label?: string;
		description?: string;
		error?: string | string[];
		required?: boolean;
		disabled?: boolean;
		class?: string;
		children: Snippet;
	}

	const {
		id,
		label,
		description,
		error,
		required = false,
		disabled = false,
		class: className,
		children,
	}: Props = $props();

	const errors = $derived(errorList(error));
	const describedBy = $derived(
		errors.length > 0
			? `${id}-error`
			: description
				? `${id}-description`
				: undefined,
	);
</script>

<Field.Set
	{id}
	{disabled}
	aria-describedby={describedBy}
	data-invalid={errors.length > 0 || undefined}
	class={cn("w-full min-w-0 gap-3", className)}
>
	{#if label}
		<Field.Legend
			id="{id}-label"
			variant="label"
			class={cn(errors.length > 0 && "text-destructive")}
		>
			{label}
			{#if required}
				<span class="text-destructive" aria-hidden="true">*</span>
			{/if}
		</Field.Legend>
	{/if}
	{@render children()}
	{#if errors.length > 0}
		<Field.Error
			id="{id}-error"
			errors={errors.map((message) => ({ message }))}
		/>
	{:else if description}
		<Field.Description id="{id}-description">{description}</Field.Description>
	{/if}
</Field.Set>
