type WebkitVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

const HIDE_CONTROLS_MS = 3000;

/**
 * The `<video>` element's state the controls show, bound off the element, and the actions they run on it. `currentTime`
 * and `paused` stay with the component, which exposes them as bindable props.
 */
export class VideoPlayerState {
	duration = $state(0);
	volume = $state(1);
	muted = $state(false);
	rate = $state(1);
	buffered = $state<Array<{ start: number; end: number }>>([]);
	readyState = $state(0);
	seeking = $state(false);
	ended = $state(false);
	failed = $state(false);
	fullscreen = $state(false);
	controlsVisible = $state(true);
	menuOpen = $state(false);

	#video: () => HTMLVideoElement | null;
	#container: () => HTMLElement | null;
	#hideTimer: ReturnType<typeof setTimeout> | undefined;

	constructor(elements: {
		video: () => HTMLVideoElement | null;
		container: () => HTMLElement | null;
	}) {
		this.#video = elements.video;
		this.#container = elements.container;
	}

	togglePlay = () => {
		const video = this.#video();
		if (!video) {
			return;
		}
		if (video.ended) {
			video.currentTime = 0;
		}
		if (video.paused || video.ended) {
			video.play().catch(() => undefined);
		} else {
			video.pause();
		}
	};

	seekTo = (time: number) => {
		const video = this.#video();
		if (!video) {
			return;
		}
		const end = Number.isFinite(video.duration)
			? video.duration
			: Number.POSITIVE_INFINITY;
		video.currentTime = Math.min(Math.max(0, time), end);
	};

	seek = (delta: number) => {
		this.seekTo((this.#video()?.currentTime ?? 0) + delta);
	};

	adjustVolume = (delta: number) => {
		const current = this.muted ? 0 : this.volume;
		this.volume = Math.min(
			1,
			Math.max(0, Number((current + delta).toFixed(2))),
		);
		this.muted = this.volume === 0;
	};

	toggleMute = () => {
		this.muted = !this.muted;
		if (!this.muted && this.volume === 0) {
			this.volume = 1;
		}
	};

	toggleFullscreen = async () => {
		try {
			if (document.fullscreenElement) {
				await document.exitFullscreen();
				return;
			}
			const container = this.#container();
			if (container?.requestFullscreen) {
				await container.requestFullscreen();
				return;
			}
			(this.#video() as WebkitVideo | null)?.webkitEnterFullscreen?.();
		} catch {
			this.syncFullscreen();
		}
	};

	syncFullscreen = () => {
		const container = this.#container();
		this.fullscreen =
			container !== null && document.fullscreenElement === container;
	};

	togglePictureInPicture = async () => {
		const video = this.#video();
		try {
			if (document.pictureInPictureElement) {
				await document.exitPictureInPicture();
			} else if (video) {
				await video.requestPictureInPicture();
			}
		} catch {
			return;
		}
	};

	nudgeControls = () => {
		this.controlsVisible = true;
		clearTimeout(this.#hideTimer);
		this.#hideTimer = setTimeout(() => {
			if (this.#video()?.paused === false && !this.menuOpen) {
				this.controlsVisible = false;
			}
		}, HIDE_CONTROLS_MS);
	};

	hideControls = () => {
		clearTimeout(this.#hideTimer);
		this.controlsVisible = false;
	};

	dispose = () => clearTimeout(this.#hideTimer);
}
