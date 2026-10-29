<script lang="ts">
	import EyeIcon from "@lucide/svelte/icons/eye";
	import EyeOffIcon from "@lucide/svelte/icons/eye-off";
	import type { HTMLInputAttributes } from "svelte/elements";

	import IconButton from "#lib/components/blocks/icon-button.svelte";
	import FieldFrame, {
		errorList,
	} from "#lib/components/kit/field-frame.svelte";
	import { Input } from "#lib/components/ui/input/index.js";
	import { cn } from "#lib/utils.js";

	const defaultMessages = {
		show: "Show password",
		hide: "Hide password",
	};

	type Props = Omit<HTMLInputAttributes, "type" | "value" | "files"> & {
		value?: string;
		visible?: boolean;
		label?: string;
		description?: string;
		error?: string | string[];
		messages?: Partial<typeof defaultMessages>;
	};

	let {
		value = $bindable(""),
		visible = $bindable(false),
		name = "password",
		autocomplete = "current-password",
		id,
		label,
		description,
		error,
		messages = {},
		class: className,
		...rest
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
	const generatedId = $props.id();
	const inputId = $derived(id ?? generatedId);
	const framed = $derived(Boolean(label || description || error));
	const invalid = $derived(errorList(error).length > 0);
	const describedBy = $derived(
		invalid
			? `${inputId}-error`
			: description
				? `${inputId}-description`
				: undefined,
	);
</script>

{#snippet control()}
	<div class="relative">
		<Input
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			{...rest}
			id={inputId}
			{name}
			{autocomplete}
			type={visible ? "text" : "password"}
			bind:value
			class={cn("h-11 pr-12", className)}
		/>
		<div class="absolute inset-y-0 right-0 flex items-center">
			<IconButton
				label={visible ? text.hide : text.show}
				icon={visible ? EyeOffIcon : EyeIcon}
				onclick={() => (visible = !visible)}
				class="size-11 md:size-11"
			/>
		</div>
	</div>
{/snippet}

{#if framed}
	<FieldFrame
		id={inputId}
		{label}
		{description}
		{error}
		required={Boolean(rest.required)}
	>
		{@render control()}
	</FieldFrame>
{:else}
	{@render control()}
{/if}
