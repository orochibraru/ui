<script lang="ts" module>
	/** What every form component in the kit takes on top of its own props, so `Form` can render any of them. */
	export interface FieldProps {
		name?: string;
		label?: string;
		description?: string;
		error?: string | string[];
		required?: boolean;
		disabled?: boolean;
		id?: string;
		class?: string;
	}

	export function errorList(error: string | string[] | undefined): string[] {
		return error === undefined ? [] : [error].flat().filter(Boolean);
	}
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	import * as Field from "#lib/components/ui/field/index.js";

	interface Props {
		id: string;
		label?: string;
		description?: string;
		error?: string | string[];
		required?: boolean;
		orientation?: "vertical" | "horizontal";
		class?: string;
		children: Snippet;
	}

	const {
		id,
		label,
		description,
		error,
		required = false,
		orientation = "vertical",
		class: className,
		children,
	}: Props = $props();

	const errors = $derived(errorList(error));
</script>

<Field.Field
	{orientation}
	class={className}
	data-invalid={errors.length > 0 || undefined}
>
	{#if label}
		<Field.Label for={id}>
			{label}
			{#if required}
				<span class="text-destructive" aria-hidden="true">*</span>
			{/if}
		</Field.Label>
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
</Field.Field>
