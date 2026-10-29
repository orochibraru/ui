<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";

	import { Textarea } from "#lib/components/ui/textarea/index.js";
	import { cn } from "#lib/utils.js";

	import FieldFrame, { errorList, type FieldProps } from "./field-frame.svelte";

	const defaultMessages = {
		characters: "characters",
	};

	type Props = FieldProps &
		Omit<HTMLTextareaAttributes, "value" | "class" | "id" | "name"> & {
			value?: string;
			messages?: Partial<typeof defaultMessages>;
		};

	let {
		value = $bindable(""),
		name,
		label,
		description,
		error,
		required = false,
		disabled = false,
		id,
		class: className,
		rows,
		maxlength,
		messages = {},
		...rest
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
	const generatedId = $props.id();
	const textareaId = $derived(id ?? generatedId);
	const invalid = $derived(errorList(error).length > 0);
	const counted = $derived(maxlength !== undefined && maxlength !== null);
	const describedBy = $derived(
		[
			invalid
				? `${textareaId}-error`
				: description
					? `${textareaId}-description`
					: undefined,
			counted ? `${textareaId}-counter` : undefined,
		]
			.filter(Boolean)
			.join(" ") || undefined,
	);
</script>

<FieldFrame
	id={textareaId}
	{label}
	{description}
	{error}
	{required}
	class={className}
>
	<div class="grid gap-1.5">
		<Textarea
			{...rest}
			id={textareaId}
			{name}
			{rows}
			{maxlength}
			{required}
			{disabled}
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			bind:value
			class={cn(
				"px-3 py-2.5",
				rows === undefined ? "min-h-24" : "field-sizing-fixed min-h-0",
			)}
		/>
		{#if counted}
			<p
				id="{textareaId}-counter"
				class={cn(
					"text-muted-foreground text-right text-xs tabular-nums",
					(value ?? "").length >= Number(maxlength) && "text-destructive",
				)}
			>
				{(value ?? "").length}/{maxlength}
				<span class="sr-only">{text.characters}</span>
			</p>
		{/if}
	</div>
</FieldFrame>
