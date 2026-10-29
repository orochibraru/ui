<script lang="ts">
	import type { ComponentProps } from "svelte";

	import Stepper, {
		type StepperStep,
	} from "#lib/components/blocks/stepper.svelte";

	interface Props {
		steps: StepperStep[];
		onnext?: (step: number) => boolean;
		messages?: ComponentProps<typeof Stepper>["messages"];
	}

	const { steps, onnext, messages }: Props = $props();

	let active = $state(0);
</script>

<Stepper {steps} bind:active {onnext} {messages}>
	{#each steps as step, index (step.label)}
		<p hidden={active !== index}>Panel {step.label}</p>
	{/each}
	{#snippet finish()}
		<button type="button">Finish</button>
	{/snippet}
</Stepper>
<p data-testid="active">{active}</p>
