<script lang="ts" module>
	export type { Chapter } from "#lib/components/blocks/video-player/format.js";

	export interface VideoTrack {
		src: string;
		label: string;
		srclang?: string;
		kind?: "subtitles" | "captions";
		default?: boolean;
	}
</script>

<script lang="ts">
	import CenterControls from "#lib/components/blocks/video-player/center-controls.svelte";
	import ControlBar from "#lib/components/blocks/video-player/control-bar.svelte";
	import type { Chapter } from "#lib/components/blocks/video-player/format.js";
	import GestureFeedback from "#lib/components/blocks/video-player/gesture-feedback.svelte";
	import { gestureZone } from "#lib/components/blocks/video-player/gestures.js";
	import { handlePlayerKey } from "#lib/components/blocks/video-player/keymap.js";
	import { defaultMessages } from "#lib/components/blocks/video-player/messages.js";
	import { VideoPlayerState } from "#lib/components/blocks/video-player/player.svelte.js";
	import { TapGestures } from "#lib/components/blocks/video-player/tap-gestures.svelte.js";
	import { Spinner } from "#lib/components/ui/spinner/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";
	import { haptic } from "#lib/haptics.js";
	import { cn } from "#lib/utils.js";

	interface Props {
		src: string;
		poster?: string;
		title?: string;
		tracks?: VideoTrack[];
		chapters?: Chapter[];
		autoplay?: boolean;
		currentTime?: number;
		paused?: boolean;
		onplay?: () => void;
		onpause?: () => void;
		onended?: () => void;
		onerror?: () => void;
		class?: string;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		src,
		poster,
		title,
		tracks = [],
		chapters = [],
		autoplay = false,
		currentTime = $bindable(0),
		paused = $bindable(true),
		onplay,
		onpause,
		onended,
		onerror,
		class: className,
		messages = {},
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });

	let container = $state<HTMLDivElement | null>(null);
	let video = $state<HTMLVideoElement | null>(null);
	let pictureInPicture = $state(false);

	const player = new VideoPlayerState({
		video: () => video,
		container: () => container,
	});

	const loading = $derived(
		!player.failed && (player.seeking || !paused) && player.readyState < 3,
	);
	const controlsShown = $derived(
		player.controlsVisible || paused || player.menuOpen || player.failed,
	);
	const portalTarget = $derived<HTMLElement | string>(
		player.fullscreen && container ? container : "body",
	);

	let activeSubtitle = $derived(tracks.findIndex((track) => track.default));

	$effect(() => {
		const textTracks = video?.textTracks;
		if (!textTracks || textTracks.length !== tracks.length) {
			return;
		}
		Array.from(textTracks).forEach((track, index) => {
			track.mode = index === activeSubtitle ? "showing" : "disabled";
		});
	});

	$effect(() => {
		pictureInPicture = document.pictureInPictureEnabled === true;
		return player.dispose;
	});

	function cycleSubtitles() {
		if (tracks.length > 0) {
			activeSubtitle =
				activeSubtitle + 1 < tracks.length ? activeSubtitle + 1 : -1;
		}
	}

	function touchTap() {
		if (controlsShown && !paused) {
			player.hideControls();
		} else {
			player.nudgeControls();
		}
	}

	const gestures = new TapGestures({
		seek: (delta) => {
			haptic("tap");
			player.seek(delta);
		},
		onTap: touchTap,
	});
	$effect(() => gestures.dispose);

	let pointerType = "mouse";
	let engaged = false;

	function onvideoclick(event: MouseEvent) {
		if (pointerType === "mouse") {
			player.togglePlay();
			return;
		}
		const rect = (event.currentTarget as Element).getBoundingClientRect();
		const x = event.clientX - rect.left;
		gestures.tap(
			{ x, y: event.clientY - rect.top, time: event.timeStamp },
			gestureZone(x, rect.width),
		);
	}

	function onkeydown(event: KeyboardEvent) {
		if (!(engaged || container?.contains(event.target as Node))) {
			return;
		}
		const handled = handlePlayerKey(event, {
			togglePlay: player.togglePlay,
			seek: player.seek,
			adjustVolume: player.adjustVolume,
			toggleMute: player.toggleMute,
			toggleFullscreen: () => void player.toggleFullscreen(),
			cycleSubtitles,
		});
		if (handled) {
			player.nudgeControls();
		}
	}
</script>

<svelte:window
	{onkeydown}
	onpointerdown={(event) => {
		engaged = container?.contains(event.target as Node) ?? false;
	}}
/>
<svelte:document onfullscreenchange={player.syncFullscreen} />

<Tooltip.Provider delayDuration={300}>
	<div
		bind:this={container}
		role="region"
		aria-label={title ?? text.region}
		data-fullscreen={player.fullscreen || undefined}
		class={cn(
			"group/player relative isolate aspect-video w-full overflow-hidden rounded-2xl bg-black select-none data-fullscreen:rounded-none",
			!controlsShown && "cursor-none",
			className,
		)}
		onpointermove={(event) => {
			if (event.pointerType === "mouse") {
				player.nudgeControls();
			}
		}}
		onpointerleave={(event) => {
			if (event.pointerType === "mouse" && !paused && !player.menuOpen) {
				player.hideControls();
			}
		}}
	>
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			bind:this={video}
			bind:currentTime
			bind:paused
			bind:duration={player.duration}
			bind:volume={player.volume}
			bind:muted={player.muted}
			bind:playbackRate={player.rate}
			bind:buffered={player.buffered}
			bind:readyState={player.readyState}
			bind:seeking={player.seeking}
			bind:ended={player.ended}
			{src}
			{poster}
			{autoplay}
			playsinline
			preload="metadata"
			class="size-full object-contain"
			onpointerdown={(event) => (pointerType = event.pointerType)}
			onclick={onvideoclick}
			ondblclick={() => {
				if (pointerType === "mouse") {
					void player.toggleFullscreen();
				}
			}}
			onloadstart={() => (player.failed = false)}
			onerror={() => {
				player.failed = true;
				onerror?.();
			}}
			onplay={() => {
				player.nudgeControls();
				onplay?.();
			}}
			onpause={() => onpause?.()}
			onended={() => onended?.()}
		>
			{#each tracks as track (track.src)}
				<track
					src={track.src}
					label={track.label}
					srclang={track.srclang}
					kind={track.kind ?? "subtitles"}
					default={track.default}
				/>
			{/each}
		</video>

		<GestureFeedback feedback={gestures.feedback} />

		{#if loading}
			<div
				class="pointer-events-none absolute inset-0 flex items-center justify-center"
			>
				<Spinner aria-label={text.loading} class="size-10 text-white" />
			</div>
		{/if}

		{#if player.failed}
			<div
				role="alert"
				class="absolute inset-0 flex items-center justify-center bg-black/70 p-6 text-center text-sm font-medium text-white"
			>
				{text.error}
			</div>
		{/if}

		<div
			class={cn(
				"pointer-events-none absolute inset-0 flex flex-col bg-linear-to-t from-black/60 via-transparent to-black/60 pt-safe-top pr-safe-right pb-safe-bottom pl-safe-left transition-[opacity,visibility] duration-200",
				controlsShown && !player.failed ? "opacity-100" : "invisible opacity-0",
			)}
		>
			{#if title}
				<div class="px-5 pt-4">
					<p class="truncate font-semibold text-white drop-shadow">
						{title}
					</p>
				</div>
			{/if}
			<div class="flex min-h-0 flex-1 items-center justify-center">
				{#if !loading}
					<CenterControls {player} {paused} {text} />
				{/if}
			</div>
			<ControlBar
				{player}
				{paused}
				{currentTime}
				{chapters}
				subtitles={tracks.map((track) => track.label)}
				{activeSubtitle}
				onsubtitlechange={(index) => (activeSubtitle = index)}
				{pictureInPicture}
				{portalTarget}
				{text}
			/>
		</div>
	</div>
</Tooltip.Provider>
