<script lang="ts">
	import FastForwardIcon from "@lucide/svelte/icons/fast-forward";
	import RewindIcon from "@lucide/svelte/icons/rewind";

	import type { SeekFeedback } from "#lib/components/blocks/video-player/tap-gestures.svelte.js";
	import { cn } from "#lib/utils.js";

	const { feedback }: { feedback: SeekFeedback | null } = $props();
</script>

{#if feedback}
	<div
		class={cn(
			"bg-foreground/10 pointer-events-none absolute inset-y-0 z-10 flex w-1/3 items-center justify-center",
			feedback.side === "left"
				? "left-0 rounded-r-[50%]"
				: "right-0 rounded-l-[50%]",
		)}
	>
		<span
			class="glass flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold tabular"
		>
			{#if feedback.side === "left"}
				<RewindIcon class="size-4 fill-current" />
				-{feedback.seconds}s
			{:else}
				+{feedback.seconds}s
				<FastForwardIcon class="size-4 fill-current" />
			{/if}
		</span>
	</div>
{/if}
