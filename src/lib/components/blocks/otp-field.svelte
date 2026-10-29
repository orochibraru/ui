<script lang="ts">
	import * as InputOTP from "#lib/components/ui/input-otp/index.js";

	interface Props {
		value?: string;
		length?: number;
		name?: string;
		id?: string;
		disabled?: boolean;
		invalid?: boolean;
		oncomplete?: (code: string) => void;
	}

	let {
		value = $bindable(""),
		length = 6,
		name = "code",
		id,
		disabled = false,
		invalid = false,
		oncomplete,
	}: Props = $props();

	const half = $derived(Math.ceil(length / 2));
</script>

<InputOTP.Root
	maxlength={length}
	pattern="^\d+$"
	inputmode="numeric"
	autocomplete="one-time-code"
	{name}
	inputId={id}
	{disabled}
	bind:value
	onComplete={() => oncomplete?.(value)}
>
	{#snippet children({ cells })}
		<InputOTP.Group>
			{#each cells.slice(0, half) as cell (cell)}
				<InputOTP.Slot
					{cell}
					aria-invalid={invalid}
					class="h-13 w-11 text-xl font-semibold tabular md:h-12 md:w-10"
				/>
			{/each}
		</InputOTP.Group>
		<InputOTP.Separator />
		<InputOTP.Group>
			{#each cells.slice(half) as cell (cell)}
				<InputOTP.Slot
					{cell}
					aria-invalid={invalid}
					class="h-13 w-11 text-xl font-semibold tabular md:h-12 md:w-10"
				/>
			{/each}
		</InputOTP.Group>
	{/snippet}
</InputOTP.Root>
