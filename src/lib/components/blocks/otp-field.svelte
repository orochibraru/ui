<script lang="ts">
	import FieldFrame, {
		errorList,
	} from "#lib/components/kit/field-frame.svelte";
	import * as InputOTP from "#lib/components/ui/input-otp/index.js";
	import { cn } from "#lib/utils.js";

	interface Props {
		value?: string;
		length?: number;
		name?: string;
		id?: string;
		disabled?: boolean;
		invalid?: boolean;
		oncomplete?: (code: string) => void;
		label?: string;
		description?: string;
		error?: string | string[];
		required?: boolean;
		/** `center` centres the label and the boxes, as a code screen usually does. */
		align?: "start" | "center";
		class?: string;
	}

	let {
		value = $bindable(""),
		length = 6,
		name = "code",
		id,
		disabled = false,
		invalid = false,
		oncomplete,
		label,
		description,
		error,
		required = false,
		align = "start",
		class: className,
	}: Props = $props();

	const half = $derived(Math.ceil(length / 2));
	const generatedId = $props.id();
	const inputId = $derived(id ?? generatedId);
	const framed = $derived(Boolean(label || description || error));
	const showInvalid = $derived(invalid || errorList(error).length > 0);
	const centered = $derived(align === "center");
</script>

{#snippet boxes()}
	<div class={cn("flex", centered && "justify-center", !framed && className)}>
		<InputOTP.Root
			maxlength={length}
			pattern="^\d+$"
			inputmode="numeric"
			autocomplete="one-time-code"
			pasteTransformer={(text) => text.replace(/\D/g, "")}
			{name}
			{inputId}
			{disabled}
			bind:value
			onComplete={() => oncomplete?.(value)}
		>
			{#snippet children({ cells })}
				<InputOTP.Group>
					{#each cells.slice(0, half) as cell (cell)}
						<InputOTP.Slot
							{cell}
							aria-invalid={showInvalid}
							class="h-13 w-11 text-xl font-semibold tabular md:h-12 md:w-10"
						/>
					{/each}
				</InputOTP.Group>
				<InputOTP.Separator />
				<InputOTP.Group>
					{#each cells.slice(half) as cell (cell)}
						<InputOTP.Slot
							{cell}
							aria-invalid={showInvalid}
							class="h-13 w-11 text-xl font-semibold tabular md:h-12 md:w-10"
						/>
					{/each}
				</InputOTP.Group>
			{/snippet}
		</InputOTP.Root>
	</div>
{/snippet}

{#if framed}
	<FieldFrame
		id={inputId}
		{label}
		{description}
		{error}
		{required}
		class={cn(
			centered && "items-center text-center *:data-[slot=field-label]:w-fit",
			className,
		)}
	>
		{@render boxes()}
	</FieldFrame>
{:else}
	{@render boxes()}
{/if}
