<script lang="ts">
	import PauseIcon from "@lucide/svelte/icons/pause";
	import PlayIcon from "@lucide/svelte/icons/play";
	import RotateCcwIcon from "@lucide/svelte/icons/rotate-ccw";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";

	import { SEEK_SECONDS } from "#lib/components/blocks/video-player/keymap.js";
	import type { VideoPlayerMessages } from "#lib/components/blocks/video-player/messages.js";
	import type { VideoPlayerState } from "#lib/components/blocks/video-player/player.svelte.js";

	interface Props {
		player: VideoPlayerState;
		paused: boolean;
		text: VideoPlayerMessages;
	}

	const { player, paused, text }: Props = $props();

	const side =
		"bg-chrome text-foreground ring-border pointer-events-auto flex size-11 items-center justify-center rounded-full ring-1 backdrop-blur-xl transition-transform active:scale-90 sm:size-14";
</script>

<div class="flex items-center justify-center gap-8 sm:gap-12">
	<button
		type="button"
		aria-label={text.seekBackward}
		class={side}
		onclick={() => player.seek(-SEEK_SECONDS)}
	>
		<RotateCcwIcon class="size-5 sm:size-6" />
	</button>
	<button
		type="button"
		aria-label={player.ended ? text.replay : paused ? text.play : text.pause}
		class="bg-primary text-primary-foreground glow pointer-events-auto flex size-14 items-center justify-center rounded-full transition-transform active:scale-90 sm:size-18"
		onclick={player.togglePlay}
	>
		{#if player.ended}
			<RotateCcwIcon class="size-7 sm:size-8" />
		{:else if paused}
			<PlayIcon class="size-7 fill-current sm:size-8" />
		{:else}
			<PauseIcon class="size-7 fill-current sm:size-8" />
		{/if}
	</button>
	<button
		type="button"
		aria-label={text.seekForward}
		class={side}
		onclick={() => player.seek(SEEK_SECONDS)}
	>
		<RotateCwIcon class="size-5 sm:size-6" />
	</button>
</div>
