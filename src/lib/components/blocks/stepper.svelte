<script lang="ts" module>
	import type { Component } from "svelte";

	export interface StepperStep {
		label: string;
		/** One line under the step's name on phones, saying what the step asks for. */
		description?: string;
		icon?: Component<{ class?: string }>;
	}
</script>

<script lang="ts">
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import CheckIcon from "@lucide/svelte/icons/check";
	import type { Snippet } from "svelte";

	import StepperPhoneHeader from "#lib/components/blocks/stepper/stepper-phone-header.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
	import { haptic } from "#lib/haptics.js";

	const defaultMessages = {
		back: "Back",
		next: "Next",
		upNext: "Next:",
		progress: (step: number, total: number) => `Step ${step} of ${total}`,
		stepLabel: (step: number, label: string) => `Step ${step}: ${label}`,
	};

	interface Props {
		steps: StepperStep[];
		/** The shown step; the page hides every other panel with it so field state survives. */
		active?: number;
		/** Validates the step being left; false keeps the user on it. */
		onnext?: (step: number) => boolean;
		/** Every step's panel, the inactive ones hidden by the page. */
		children: Snippet;
		/** Shown instead of Next on the last step: the page's own submit button. */
		finish: Snippet;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		steps,
		active = $bindable(0),
		onnext = () => true,
		children,
		finish,
		messages = {},
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });

	let furthest = $state(0);
	const reached = $derived(Math.max(furthest, active));
	const last = $derived(active >= steps.length - 1);

	function goTo(step: number) {
		if (step <= reached) {
			active = step;
		}
	}

	function next() {
		haptic("tap");
		if (!onnext(active)) {
			return;
		}
		furthest = Math.max(reached, active + 1);
		active += 1;
	}

	function back() {
		haptic("tap");
		active = Math.max(0, active - 1);
	}

	function markerClass(step: number): string {
		if (step === active) {
			return "border-primary bg-primary text-primary-foreground glow";
		}
		if (step < active) {
			return "border-primary/40 bg-accent text-accent-foreground";
		}
		return "border-border bg-muted text-muted-foreground";
	}
</script>

<div class="grid w-full gap-7">
	<ol class="hidden items-start sm:flex">
		{#each steps as step, index (step.label)}
			<li class="flex flex-1 items-start last:flex-none">
				<button
					type="button"
					class="group focus-visible:ring-ring/50 flex min-w-11 shrink-0 flex-col items-center gap-2 rounded-xl px-2 outline-none focus-visible:ring-3 disabled:cursor-not-allowed"
					aria-current={index === active ? "step" : undefined}
					aria-label={text.stepLabel(index + 1, step.label)}
					disabled={index > reached}
					onclick={() => goTo(index)}
				>
					<span
						class="flex size-9 items-center justify-center rounded-full border transition-all duration-300 {markerClass(
							index,
						)}"
					>
						{#if index < active}
							<CheckIcon class="size-4" />
						{:else if step.icon}
							<step.icon class="size-4" />
						{:else}
							<span class="text-xs font-medium tabular">{index + 1}</span>
						{/if}
					</span>
					<span
						class="text-xs font-medium tracking-wide transition-colors {index ===
						active
							? 'text-foreground'
							: 'text-muted-foreground'} {index <= reached
							? 'group-hover:text-foreground'
							: 'opacity-60'}"
					>
						{step.label}
					</span>
				</button>
				{#if index < steps.length - 1}
					<span
						class="mt-4.25 h-0.5 flex-1 rounded-full transition-colors duration-300 {index <
						active
							? 'bg-primary/50'
							: 'bg-border'}"
						aria-hidden="true"
					></span>
				{/if}
			</li>
		{/each}
	</ol>

	<StepperPhoneHeader
		{steps}
		{active}
		{reached}
		progress={text.progress(active + 1, steps.length)}
		upNext={text.upNext}
		stepLabel={text.stepLabel}
		onselect={goTo}
	/>

	{@render children()}

	<div class="flex gap-3">
		{#if active > 0}
			<Button
				variant="outline"
				class="h-11 flex-1 rounded-full px-5 sm:flex-none"
				onclick={back}
			>
				<ArrowLeftIcon class="size-4" />
				{text.back}
			</Button>
		{/if}
		{#if last}
			<div class="flex flex-1 *:flex-1 sm:ml-auto sm:flex-none sm:*:flex-none">
				{@render finish()}
			</div>
		{:else}
			<Button
				class="glow h-11 flex-1 rounded-full px-5 sm:ml-auto sm:flex-none"
				onclick={next}
			>
				{text.next}
				<ArrowRightIcon class="size-4" />
			</Button>
		{/if}
	</div>
</div>
