<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	import PasswordInput from "#lib/components/blocks/password-input.svelte";
	import { Input } from "#lib/components/ui/input/index.js";

	import FieldFrame, { errorList, type FieldProps } from "./field-frame.svelte";

	type Props = FieldProps &
		Omit<HTMLInputAttributes, "value" | "files" | "class" | "id" | "name"> & {
			value?: string | number;
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
		type = "text",
		...rest
	}: Props = $props();

	const generatedId = $props.id();
	const inputId = $derived(id ?? generatedId);
	const invalid = $derived(errorList(error).length > 0);
	const describedBy = $derived(
		invalid
			? `${inputId}-error`
			: description
				? `${inputId}-description`
				: undefined,
	);
</script>

<FieldFrame
	id={inputId}
	{label}
	{description}
	{error}
	{required}
	class={className}
>
	{#if type === "password"}
		<PasswordInput
			{...rest}
			id={inputId}
			{name}
			{required}
			{disabled}
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			bind:value={() => String(value ?? ""), (next) => (value = next)}
		/>
	{:else}
		<Input
			{...rest}
			id={inputId}
			{name}
			type={type ?? "text"}
			{required}
			{disabled}
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			bind:value
			class="h-11"
		/>
	{/if}
</FieldFrame>
