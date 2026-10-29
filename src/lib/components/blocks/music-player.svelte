<script lang="ts" module>
	export interface MusicTrack {
		src: string;
		title: string;
		artist?: string;
		artwork?: string;
	}
</script>

<script lang="ts">
	import Disc3Icon from "@lucide/svelte/icons/disc-3";
	import FastForwardIcon from "@lucide/svelte/icons/fast-forward";
	import PauseIcon from "@lucide/svelte/icons/pause";
	import PlayIcon from "@lucide/svelte/icons/play";
	import RewindIcon from "@lucide/svelte/icons/rewind";
	import SkipBackIcon from "@lucide/svelte/icons/skip-back";
	import SkipForwardIcon from "@lucide/svelte/icons/skip-forward";

	import IconButton from "#lib/components/blocks/icon-button.svelte";
	import { Spinner } from "#lib/components/ui/spinner/index.js";
	import { haptic } from "#lib/haptics.js";

	import { formatTime } from "./music-player/format-time.js";
	import LabelledSlider from "./music-player/labelled-slider.svelte";
	import VolumeControl from "./music-player/volume-control.svelte";

	const defaultMessages = {
		player: "Music player",
		play: "Play",
		pause: "Pause",
		previous: "Previous",
		next: "Next",
		back: "Back 5 seconds",
		forward: "Forward 5 seconds",
		seek: "Seek",
		volume: "Volume",
	};

	interface Props {
		tracks: MusicTrack[];
		index?: number;
		paused?: boolean;
		onchange?: (track: MusicTrack, index: number) => void;
		onended?: (track: MusicTrack, index: number) => void;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		tracks,
		index = $bindable(0),
		paused = $bindable(true),
		onchange,
		onended,
		messages = {},
	}: Props = $props();

	const SKIP_SECONDS = 5;
	const RESTART_AFTER_SECONDS = 3;

	const text = $derived({ ...defaultMessages, ...messages });
	const track = $derived(tracks[index]);
	const hasNext = $derived(index < tracks.length - 1);

	let audio: HTMLAudioElement | undefined = $state();
	let currentTime = $state(0);
	let duration = $state(0);
	let volume = $state(1);
	let waiting = $state(false);
	let loadedSource: string | undefined;

	const seekable = $derived(Number.isFinite(duration) && duration > 0);
	const ToggleIcon = $derived(
		paused ? PlayIcon : waiting ? Spinner : PauseIcon,
	);

	$effect(() => {
		const source = track?.src;
		const shouldPlay = !paused;
		if (!audio) {
			return;
		}
		const reload = source !== loadedSource;
		if (reload) {
			loadedSource = source;
			currentTime = 0;
			waiting = false;
			if (source) {
				audio.src = source;
			} else {
				audio.removeAttribute("src");
			}
			audio.load();
		}
		if (shouldPlay && source && (reload || audio.paused)) {
			void start(audio);
		} else if (!shouldPlay && !audio.paused) {
			audio.pause();
		}
	});

	async function start(element: HTMLAudioElement) {
		try {
			await element.play();
		} catch (error) {
			if (!(error instanceof DOMException && error.name === "AbortError")) {
				paused = true;
			}
		}
	}

	function go(to: number) {
		const target = tracks[to];
		if (!target) {
			return;
		}
		index = to;
		onchange?.(target, to);
	}

	function toggle() {
		haptic("tap");
		paused = !paused;
	}

	function previous() {
		haptic("tap");
		if (currentTime > RESTART_AFTER_SECONDS || index === 0) {
			currentTime = 0;
			return;
		}
		go(index - 1);
	}

	function next() {
		haptic("tap");
		go(index + 1);
	}

	function skip(by: number) {
		if (seekable) {
			currentTime = Math.min(Math.max(currentTime + by, 0), duration);
		}
	}

	function ended() {
		if (track) {
			onended?.(track, index);
		}
		if (hasNext) {
			go(index + 1);
			paused = false;
		}
	}

	function syncPaused() {
		if (audio) {
			paused = audio.paused;
		}
	}
</script>

<audio
	bind:this={audio}
	bind:currentTime
	bind:duration
	bind:volume
	preload="metadata"
	onplay={syncPaused}
	onpause={syncPaused}
	onwaiting={() => (waiting = true)}
	onplaying={() => (waiting = false)}
	oncanplay={() => (waiting = false)}
	onended={ended}
></audio>

{#if track}
	<section
		aria-label={text.player}
		class="glass grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-3xl p-3 [grid-template-areas:'meta_volume'_'seek_seek'_'controls_controls'] md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] md:gap-x-6 md:px-4 md:[grid-template-areas:'meta_controls_volume'_'meta_seek_volume']"
	>
		<div class="flex min-w-0 items-center gap-3 [grid-area:meta]">
			{#if track.artwork}
				<img
					src={track.artwork}
					alt=""
					class="size-12 shrink-0 rounded-xl object-cover"
				/>
			{:else}
				<div
					class="bg-primary/12 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl"
				>
					<Disc3Icon class="size-6" />
				</div>
			{/if}
			<div class="min-w-0">
				<p class="truncate font-medium">{track.title}</p>
				{#if track.artist}
					<p class="text-muted-foreground truncate text-sm">
						{track.artist}
					</p>
				{/if}
			</div>
		</div>

		<div class="flex items-center gap-3 [grid-area:seek]">
			<span class="text-muted-foreground tabular min-w-10 text-xs">
				{formatTime(currentTime)}
			</span>
			<LabelledSlider
				class="flex-1"
				value={seekable ? currentTime : 0}
				max={seekable ? duration : 1}
				step={1}
				disabled={!seekable}
				label={text.seek}
				valueText={`${formatTime(currentTime)} / ${formatTime(duration)}`}
				oncommit={(value) => (currentTime = value)}
			/>
			<span class="text-muted-foreground tabular min-w-10 text-right text-xs">
				{formatTime(duration)}
			</span>
		</div>

		<div
			class="flex items-center justify-center gap-1 [grid-area:controls] md:gap-2"
		>
			<IconButton
				label={text.back}
				icon={RewindIcon}
				disabled={!seekable}
				onclick={() => skip(-SKIP_SECONDS)}
			/>
			<IconButton
				label={text.previous}
				icon={SkipBackIcon}
				onclick={previous}
			/>
			<IconButton
				label={paused ? text.play : text.pause}
				icon={ToggleIcon}
				variant="default"
				class="glow size-14 md:size-11"
				onclick={toggle}
			/>
			<IconButton
				label={text.next}
				icon={SkipForwardIcon}
				disabled={!hasNext}
				onclick={next}
			/>
			<IconButton
				label={text.forward}
				icon={FastForwardIcon}
				disabled={!seekable}
				onclick={() => skip(SKIP_SECONDS)}
			/>
		</div>

		<div class="[grid-area:volume]">
			<VolumeControl bind:volume label={text.volume} />
		</div>
	</section>
{/if}
