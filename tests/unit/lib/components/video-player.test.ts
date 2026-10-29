import {
	afterEach,
	beforeEach,
	describe,
	expect,
	mock,
	spyOn,
	test,
} from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import VideoPlayer from "#lib/components/blocks/video-player.svelte";

describe("VideoPlayer", () => {
	let play: ReturnType<typeof spyOn>;
	let pause: ReturnType<typeof spyOn>;

	beforeEach(() => {
		play = spyOn(HTMLMediaElement.prototype, "play").mockImplementation(
			function (this: HTMLMediaElement) {
				Object.defineProperty(this, "paused", {
					configurable: true,
					value: false,
				});
				this.dispatchEvent(new Event("play"));
				return Promise.resolve();
			},
		);
		pause = spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
			function (this: HTMLMediaElement) {
				Object.defineProperty(this, "paused", {
					configurable: true,
					value: true,
				});
				this.dispatchEvent(new Event("pause"));
			},
		);
	});

	afterEach(() => {
		cleanup();
		play.mockRestore();
		pause.mockRestore();
	});

	test("plays and pauses from the control bar, and reports it", async () => {
		let played = 0;
		const { getAllByRole } = render(VideoPlayer, {
			src: "/clip.mp4",
			onplay: () => played++,
		});
		const [playButton] = getAllByRole("button", { name: "Play" });
		await fireEvent.click(playButton as HTMLElement);
		expect(play).toHaveBeenCalledTimes(1);
		expect(played).toBe(1);
		const [pauseButton] = getAllByRole("button", { name: "Pause" });
		await fireEvent.click(pauseButton as HTMLElement);
		expect(pause).toHaveBeenCalledTimes(1);
		expect(getAllByRole("button", { name: "Play" })).toHaveLength(2);
	});

	test("answers the keyboard once the player was clicked", async () => {
		const { getByRole } = render(VideoPlayer, { src: "/clip.mp4" });
		await fireEvent.keyDown(window, { key: "k" });
		expect(play).not.toHaveBeenCalled();

		await fireEvent.pointerDown(getByRole("region", { name: "Video player" }));
		await fireEvent.keyDown(window, { key: "k" });
		expect(play).toHaveBeenCalledTimes(1);
		await fireEvent.keyDown(window, { key: " " });
		expect(pause).toHaveBeenCalledTimes(1);

		await fireEvent.keyDown(window, { key: "m" });
		expect(getByRole("button", { name: "Unmute" })).toBeTruthy();
		await fireEvent.keyDown(window, { key: "m", metaKey: true });
		expect(getByRole("button", { name: "Unmute" })).toBeTruthy();

		await fireEvent.pointerDown(document.body);
		await fireEvent.keyDown(window, { key: "m" });
		expect(getByRole("button", { name: "Unmute" })).toBeTruthy();
	});

	test("speaks the app's words", () => {
		const { getAllByRole, getByRole } = render(VideoPlayer, {
			src: "/clip.mp4",
			tracks: [{ src: "/clip.en.vtt", label: "English", srclang: "en" }],
			messages: {
				play: "Lecture",
				fullscreen: "Plein écran",
				subtitles: "Sous-titres",
			},
		});
		expect(getAllByRole("button", { name: "Lecture" })).toHaveLength(2);
		expect(getByRole("button", { name: "Plein écran" })).toBeTruthy();
		expect(getByRole("button", { name: "Sous-titres" })).toBeTruthy();
		expect(getByRole("button", { name: "Mute" })).toBeTruthy();
	});

	test("seeks from the buttons and the scrub bar, chapters marked", async () => {
		const { container, getByRole } = render(VideoPlayer, {
			src: "/clip.mp4",
			chapters: [{ start: 0 }, { start: 60, title: "Middle" }],
		});
		const video = container.querySelector("video") as HTMLVideoElement;
		Object.defineProperty(video, "duration", {
			configurable: true,
			value: 120,
		});
		await fireEvent(video, new Event("durationchange"));
		await fireEvent.click(getByRole("button", { name: "Forward 10 seconds" }));
		expect(video.currentTime).toBe(10);
		await fireEvent.click(getByRole("button", { name: "Back 10 seconds" }));
		expect(video.currentTime).toBe(0);
		await fireEvent.input(getByRole("slider", { name: "Seek" }), {
			target: { value: "30" },
		});
		expect(video.currentTime).toBe(30);
		await fireEvent(video, new Event("timeupdate"));
		expect(
			getByRole("slider", { name: "Seek" }).getAttribute("aria-valuetext"),
		).toBe("0:30 / 2:00");
	});

	test("mutes from the volume slider and the button", async () => {
		const { getByRole } = render(VideoPlayer, { src: "/clip.mp4" });
		await fireEvent.input(getByRole("slider", { name: "Volume" }), {
			target: { value: "0" },
		});
		expect(getByRole("button", { name: "Unmute" })).toBeTruthy();
		await fireEvent.click(getByRole("button", { name: "Unmute" }));
		expect(getByRole("button", { name: "Mute" })).toBeTruthy();
		await fireEvent.click(getByRole("button", { name: "Fullscreen" }));
	});

	test("toggles playback on a click and seeks on a double tap", async () => {
		const { container, getByText } = render(VideoPlayer, { src: "/clip.mp4" });
		const video = container.querySelector("video") as HTMLVideoElement;
		await fireEvent.click(video);
		expect(play).toHaveBeenCalledTimes(1);

		video.getBoundingClientRect = () => new DOMRect(0, 0, 300, 200);
		await fireEvent.pointerDown(video, { pointerType: "touch" });
		await fireEvent.click(video, { clientX: 290, clientY: 100 });
		await fireEvent.click(video, { clientX: 285, clientY: 100 });
		expect(video.currentTime).toBe(10);
		expect(getByText("+10s")).toBeTruthy();
		await fireEvent.click(video, { clientX: 150, clientY: 100 });
		await fireEvent.click(video, { clientX: 10, clientY: 100 });
		await Bun.sleep(350);
		expect(video.currentTime).toBe(10);
		expect(pause).not.toHaveBeenCalled();
	});

	test("seeks, sets the volume and switches subtitles from the keyboard", async () => {
		const { container, getByRole } = render(VideoPlayer, {
			src: "/clip.mp4",
			tracks: [{ src: "/clip.en.vtt", label: "English", srclang: "en" }],
		});
		const video = container.querySelector("video") as HTMLVideoElement;
		await fireEvent.pointerDown(video);
		await fireEvent.keyDown(window, { key: "l" });
		await fireEvent.keyDown(window, { key: "ArrowRight" });
		await fireEvent.keyDown(window, { key: "j" });
		expect(video.currentTime).toBe(10);
		await fireEvent.keyDown(window, { key: "ArrowLeft" });
		expect(video.currentTime).toBe(0);
		await fireEvent.keyDown(window, { key: "ArrowDown" });
		await fireEvent.keyDown(window, { key: "ArrowUp" });
		expect(video.volume).toBe(1);
		await fireEvent.keyDown(window, { key: "x" });
		await fireEvent.keyDown(window, { key: "c" });
		expect(getByRole("button", { name: "Subtitles" })).toBeTruthy();
		await fireEvent.keyDown(window, { key: "f" });
	});

	test("picks a playback speed from its menu", async () => {
		const { container, getByRole, findByRole } = render(VideoPlayer, {
			src: "/clip.mp4",
		});
		const video = container.querySelector("video") as HTMLVideoElement;
		await fireEvent.pointerDown(
			getByRole("button", { name: "Playback speed" }),
			{
				button: 0,
				pointerType: "mouse",
			},
		);
		await fireEvent.click(await findByRole("menuitemradio", { name: "2×" }));
		expect(video.playbackRate).toBe(2);
	});

	test("previews the time and chapter under the pointer on the scrub bar", async () => {
		const { container, getByRole, getByText } = render(VideoPlayer, {
			src: "/clip.mp4",
			chapters: [{ start: 0, title: "Opening" }],
		});
		const video = container.querySelector("video") as HTMLVideoElement;
		Object.defineProperty(video, "duration", {
			configurable: true,
			value: 120,
		});
		await fireEvent(video, new Event("durationchange"));
		const track = getByRole("slider", { name: "Seek" })
			.parentElement as HTMLElement;
		track.getBoundingClientRect = () => new DOMRect(0, 0, 200, 24);
		await fireEvent.pointerMove(track, { clientX: 100, pointerType: "mouse" });
		expect(getByText("1:00")).toBeTruthy();
		expect(getByText("Opening")).toBeTruthy();
		await fireEvent.pointerLeave(track);
		expect(() => getByText("1:00")).toThrow();
	});

	test("goes fullscreen and into picture in picture", async () => {
		const requestFullscreen = mock(() => Promise.resolve());
		Object.assign(HTMLElement.prototype, { requestFullscreen });
		const requestPictureInPicture = mock(() => Promise.resolve());
		Object.assign(HTMLVideoElement.prototype, { requestPictureInPicture });
		Object.defineProperty(document, "pictureInPictureEnabled", {
			configurable: true,
			value: true,
		});
		try {
			const { getByRole } = render(VideoPlayer, { src: "/clip.mp4" });
			await fireEvent.click(getByRole("button", { name: "Fullscreen" }));
			expect(requestFullscreen).toHaveBeenCalledTimes(1);
			await fireEvent.click(
				getByRole("button", { name: "Picture in picture" }),
			);
			expect(requestPictureInPicture).toHaveBeenCalledTimes(1);
		} finally {
			Reflect.deleteProperty(HTMLElement.prototype, "requestFullscreen");
			Reflect.deleteProperty(
				HTMLVideoElement.prototype,
				"requestPictureInPicture",
			);
			Reflect.deleteProperty(document, "pictureInPictureEnabled");
		}
	});

	test("offers a replay once the video ended", async () => {
		let ended = 0;
		const { container, getAllByRole } = render(VideoPlayer, {
			src: "/clip.mp4",
			onended: () => ended++,
		});
		const video = container.querySelector("video") as HTMLVideoElement;
		Object.defineProperty(video, "ended", { configurable: true, value: true });
		video.currentTime = 50;
		await fireEvent(video, new Event("ended"));
		expect(ended).toBe(1);
		const replay = getAllByRole("button", { name: "Replay" });
		expect(replay).toHaveLength(2);
		await fireEvent.click(replay[1] as HTMLElement);
		expect(video.currentTime).toBe(0);
		expect(play).toHaveBeenCalledTimes(1);
	});

	test("names the region after the title and says when the video fails", async () => {
		const { container, getByRole } = render(VideoPlayer, {
			src: "/missing.mp4",
			title: "Trailer",
		});
		expect(getByRole("region", { name: "Trailer" })).toBeTruthy();
		await fireEvent(
			container.querySelector("video") as HTMLVideoElement,
			new Event("error"),
		);
		expect(getByRole("alert").textContent).toContain(
			"This video can't be played.",
		);
	});
});
