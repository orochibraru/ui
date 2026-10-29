<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";

	import * as RadioGroup from "#lib/components/ui/radio-group/index.js";
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
		value?: string;
		variant?: "list" | "cards";
	};

	let {
		options,
		value = $bindable(""),
		variant = "list",
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
	<RadioGroup.Root
		{name}
		{required}
		{disabled}
		bind:value
		aria-labelledby={label ? `${listId}-label` : undefined}
		aria-invalid={invalid || undefined}
		class={variant === "cards"
			? "gap-2 md:grid-cols-2 xl:grid-cols-3"
			: "flex flex-col gap-0"}
	>
		{#each options as option, index (option.value)}
			{@const optionId = `${listId}-${index}`}
			{@const describedBy = option.description
				? `${optionId}-description`
				: undefined}
			{#if variant === "cards"}
				<RadioGroupPrimitive.Item
					id={optionId}
					value={option.value}
					disabled={option.disabled}
					aria-labelledby="{optionId}-label"
					aria-describedby={describedBy}
					class={cn(
						"border-border bg-card data-checked:border-primary data-checked:ring-primary/30 focus-visible:ring-ring/50 flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition-all outline-none data-checked:ring-2 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
						invalid && "border-destructive",
					)}
				>
					{#snippet children({ checked })}
						<span class="min-w-0 flex-1">
							<span id="{optionId}-label" class="block text-sm font-medium"
								>{option.label}</span
							>
							{#if option.description}
								<span
									id="{optionId}-description"
									class="text-muted-foreground block text-sm"
									>{option.description}</span
								>
							{/if}
						</span>
						<CheckIcon
							class={cn(
								"text-primary size-5 shrink-0",
								!checked && "invisible",
							)}
							aria-hidden="true"
						/>
					{/snippet}
				</RadioGroupPrimitive.Item>
			{:else}
				<div
					class="group/row relative flex min-h-11 items-start gap-3 py-2.5 has-disabled:opacity-50"
				>
					<RadioGroup.Item
						id={optionId}
						value={option.value}
						disabled={option.disabled}
						aria-describedby={describedBy}
						class={cn("z-10 size-5", invalid && "border-destructive")}
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
			{/if}
		{/each}
	</RadioGroup.Root>
</FieldsetFrame>
