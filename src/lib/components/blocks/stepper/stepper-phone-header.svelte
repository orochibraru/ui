<script lang="ts">
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";

	import type { StepperStep } from "#lib/components/blocks/stepper.svelte";

	interface Props {
		steps: StepperStep[];
		active: number;
		reached: number;
		progress: string;
		upNext: string;
		stepLabel: (step: number, label: string) => string;
		onselect: (step: number) => void;
	}

	const {
		steps,
		active,
		reached,
		progress,
		upNext,
		stepLabel,
		onselect,
	}: Props = $props();

	const current = $derived(steps[active]);
	const following = $derived(steps[active + 1]);

	function segmentClass(step: number): string {
		if (step <= active) {
			return "bg-primary";
		}
		if (step <= reached) {
			return "bg-primary/30";
		}
		return "bg-muted";
	}
</script>

<div class="sm:hidden">
	<ol class="-my-3 flex gap-1.5">
		{#each steps as step, index (step.label)}
			<li class="flex-1">
				<button
					type="button"
					class="focus-visible:ring-ring/50 flex h-11 w-full items-center rounded-full outline-none focus-visible:ring-3 disabled:cursor-not-allowed"
					aria-current={index === active ? "step" : undefined}
					aria-label={stepLabel(index + 1, step.label)}
					disabled={index > reached}
					onclick={() => onselect(index)}
				>
					<span
						class="h-1.5 w-full rounded-full transition-colors duration-300 {segmentClass(
							index,
						)}"
					></span>
				</button>
			</li>
		{/each}
	</ol>
	{#if current}
		<div class="mt-4 flex items-center gap-3">
			<span
				class="bg-accent text-accent-foreground flex size-11 shrink-0 items-center justify-center rounded-xl"
				aria-hidden="true"
			>
				{#if current.icon}
					<current.icon class="size-5" />
				{:else}
					<span class="text-sm font-semibold tabular">{active + 1}</span>
				{/if}
			</span>
			<div class="min-w-0" aria-live="polite" aria-atomic="true">
				<p
					class="text-muted-foreground text-[0.6875rem] font-medium tracking-wide uppercase"
				>
					{progress}
				</p>
				<p class="text-base leading-tight font-semibold">{current.label}</p>
			</div>
		</div>
		{#if current.description}
			<p class="text-muted-foreground mt-2 text-sm">{current.description}</p>
		{/if}
		{#if following}
			<p class="text-muted-foreground mt-1.5 flex items-center gap-1 text-xs">
				{upNext}
				{following.label}
				<ArrowRightIcon class="size-3" aria-hidden="true" />
			</p>
		{/if}
	{/if}
</div>
