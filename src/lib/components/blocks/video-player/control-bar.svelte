<script lang="ts">
	import CaptionsIcon from "@lucide/svelte/icons/captions";
	import CaptionsOffIcon from "@lucide/svelte/icons/captions-off";
	import GaugeIcon from "@lucide/svelte/icons/gauge";
	import MaximizeIcon from "@lucide/svelte/icons/maximize";
	import MinimizeIcon from "@lucide/svelte/icons/minimize";
	import PauseIcon from "@lucide/svelte/icons/pause";
	import PictureInPictureIcon from "@lucide/svelte/icons/picture-in-picture-2";
	import PlayIcon from "@lucide/svelte/icons/play";
	import RotateCcwIcon from "@lucide/svelte/icons/rotate-ccw";
	import Volume1Icon from "@lucide/svelte/icons/volume-1";
	import Volume2Icon from "@lucide/svelte/icons/volume-2";
	import VolumeXIcon from "@lucide/svelte/icons/volume-x";

	import ControlButton from "#lib/components/blocks/video-player/control-button.svelte";
	import {
		type Chapter,
		formatTime,
	} from "#lib/components/blocks/video-player/format.js";
	import type { VideoPlayerMessages } from "#lib/components/blocks/video-player/messages.js";
	import OptionMenu from "#lib/components/blocks/video-player/option-menu.svelte";
	import type { VideoPlayerState } from "#lib/components/blocks/video-player/player.svelte.js";
	import ScrubBar from "#lib/components/blocks/video-player/scrub-bar.svelte";

	const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

	interface Props {
		player: VideoPlayerState;
		paused: boolean;
		currentTime: number;
		chapters: Chapter[];
		subtitles: string[];
		activeSubtitle: number;
		onsubtitlechange: (index: number) => void;
		pictureInPicture: boolean;
		portalTarget: HTMLElement | string;
		text: VideoPlayerMessages;
	}

	const {
		player,
		paused,
		currentTime,
		chapters,
		subtitles,
		activeSubtitle,
		onsubtitlechange,
		pictureInPicture,
		portalTarget,
		text,
	}: Props = $props();

	const bufferedEnd = $derived(player.buffered.at(-1)?.end ?? 0);
	const silent = $derived(player.muted || player.volume === 0);
	const playLabel = $derived(
		player.ended ? text.replay : paused ? text.play : text.pause,
	);
</script>

<div
	class="glass pointer-events-auto mx-2 mb-2 rounded-2xl px-3 pt-1.5 pb-1 sm:mx-3 sm:mb-3"
>
	<div class="flex items-center gap-3 text-xs font-medium tabular">
		<span class="w-11 shrink-0">{formatTime(currentTime)}</span>
		<div class="min-w-0 flex-1">
			<ScrubBar
				{currentTime}
				duration={player.duration}
				{bufferedEnd}
				{chapters}
				label={text.seek}
				onseek={player.seekTo}
			/>
		</div>
		<span class="text-muted-foreground w-11 shrink-0 text-right"
			>-{formatTime(Math.max(0, player.duration - currentTime))}</span
		>
	</div>
	<div class="flex items-center gap-0.5">
		<ControlButton
			label={playLabel}
			shortcut="K"
			{portalTarget}
			onclick={player.togglePlay}
			class="bg-primary text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground dark:hover:bg-primary/85 glow"
		>
			{#if player.ended}
				<RotateCcwIcon />
			{:else if paused}
				<PlayIcon class="size-5 fill-current" />
			{:else}
				<PauseIcon class="size-5 fill-current" />
			{/if}
		</ControlButton>
		<ControlButton
			label={silent ? text.unmute : text.mute}
			shortcut="M"
			{portalTarget}
			onclick={player.toggleMute}
		>
			{#if silent}
				<VolumeXIcon />
			{:else if player.volume < 0.5}
				<Volume1Icon />
			{:else}
				<Volume2Icon />
			{/if}
		</ControlButton>
		<input
			type="range"
			min="0"
			max="1"
			step="0.05"
			value={player.muted ? 0 : player.volume}
			aria-label={text.volume}
			oninput={(event) => {
				player.volume = Number(event.currentTarget.value);
				player.muted = player.volume === 0;
			}}
			class="accent-primary pointer-fine:block hidden h-1 w-20 cursor-pointer"
		/>
		<div class="ml-auto flex items-center gap-0.5">
			{#if subtitles.length > 0}
				<OptionMenu
					label={text.subtitles}
					shortcut="C"
					options={[
						{ value: "-1", label: text.subtitlesOff },
						...subtitles.map((label, index) => ({
							value: String(index),
							label,
						})),
					]}
					value={String(activeSubtitle)}
					active={activeSubtitle >= 0}
					{portalTarget}
					onselect={(value) => onsubtitlechange(Number(value))}
					onopenchange={(open) => (player.menuOpen = open)}
				>
					{#if activeSubtitle >= 0}
						<CaptionsIcon />
					{:else}
						<CaptionsOffIcon />
					{/if}
				</OptionMenu>
			{/if}
			<OptionMenu
				label={text.speed}
				options={RATES.map((rate) => ({
					value: String(rate),
					label: rate === 1 ? text.speedNormal : `${rate}×`,
				}))}
				value={String(player.rate)}
				active={player.rate !== 1}
				{portalTarget}
				onselect={(value) => (player.rate = Number(value))}
				onopenchange={(open) => (player.menuOpen = open)}
			>
				<GaugeIcon />
			</OptionMenu>
			{#if pictureInPicture}
				<ControlButton
					label={text.pictureInPicture}
					{portalTarget}
					onclick={() => void player.togglePictureInPicture()}
				>
					<PictureInPictureIcon />
				</ControlButton>
			{/if}
			<ControlButton
				label={player.fullscreen ? text.exitFullscreen : text.fullscreen}
				shortcut="F"
				{portalTarget}
				onclick={() => void player.toggleFullscreen()}
			>
				{#if player.fullscreen}
					<MinimizeIcon />
				{:else}
					<MaximizeIcon />
				{/if}
			</ControlButton>
		</div>
	</div>
</div>
