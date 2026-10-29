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
		"pointer-events-auto flex size-14 items-center justify-center rounded-full bg-black/25 text-white ring-1 ring-white/10 backdrop-blur-md transition hover:scale-105 hover:bg-black/45 active:scale-90 [&_svg]:size-7";
</script>

<div class="flex items-center justify-center gap-8 sm:gap-12">
	<button
		type="button"
		aria-label={text.seekBackward}
		class={side}
		onclick={() => player.seek(-SEEK_SECONDS)}
	>
		<RotateCcwIcon />
	</button>
	<button
		type="button"
		aria-label={player.ended ? text.replay : paused ? text.play : text.pause}
		class="pointer-events-auto flex size-16 items-center justify-center rounded-full bg-black/40 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-md transition hover:scale-105 hover:bg-black/55 active:scale-90 sm:size-18 [&_svg]:size-11 sm:[&_svg]:size-12"
		onclick={player.togglePlay}
	>
		{#if player.ended}
			<RotateCcwIcon />
		{:else if paused}
			<PlayIcon class="fill-current" />
		{:else}
			<PauseIcon class="fill-current" />
		{/if}
	</button>
	<button
		type="button"
		aria-label={text.seekForward}
		class={side}
		onclick={() => player.seek(SEEK_SECONDS)}
	>
		<RotateCwIcon />
	</button>
</div>
