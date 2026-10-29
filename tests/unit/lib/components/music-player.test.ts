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
import type { Component } from "svelte";

import MusicPlayer from "#lib/components/blocks/music-player.svelte";
import { formatTime } from "#lib/components/blocks/music-player/format-time.js";

import WithTooltips from "../../fixtures/with-tooltips.svelte";

const tracks = [
	{
		src: "https://example.com/one.mp3",
		title: "First song",
		artist: "Someone",
	},
	{ src: "https://example.com/two.mp3", title: "Second song" },
	{ src: "https://example.com/three.mp3", title: "Third song" },
];

function renderPlayer(props: Record<string, unknown> = {}) {
	return render(WithTooltips, {
		component: MusicPlayer as unknown as Component<Record<string, unknown>>,
		innerProps: { tracks, ...props },
	});
}

function tick() {
	return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("formatTime", () => {
	test("reads minutes and seconds, and hours past an hour", () => {
		expect(formatTime(0)).toBe("0:00");
		expect(formatTime(7.9)).toBe("0:07");
		expect(formatTime(83)).toBe("1:23");
		expect(formatTime(3725)).toBe("1:02:05");
	});

	test("reads an unknown or endless duration as zero", () => {
		expect(formatTime(Number.NaN)).toBe("0:00");
		expect(formatTime(Number.POSITIVE_INFINITY)).toBe("0:00");
		expect(formatTime(-4)).toBe("0:00");
	});
});

describe("MusicPlayer", () => {
	let play: ReturnType<typeof spyOn>;
	let pause: ReturnType<typeof spyOn>;

	beforeEach(() => {
		play = spyOn(HTMLMediaElement.prototype, "play");
		pause = spyOn(HTMLMediaElement.prototype, "pause");
	});

	afterEach(() => {
		cleanup();
		play.mockRestore();
		pause.mockRestore();
	});

	test("shows the track and plays then pauses it", async () => {
		const { getByText, getByRole, container } = renderPlayer();
		expect(getByText("First song")).toBeTruthy();
		expect(getByText("Someone")).toBeTruthy();
		expect(container.querySelector("audio")?.getAttribute("src")).toBe(
			tracks[0]?.src,
		);

		await fireEvent.click(getByRole("button", { name: "Play" }));
		await tick();
		expect(play).toHaveBeenCalledTimes(1);

		await fireEvent.click(getByRole("button", { name: "Pause" }));
		await tick();
		expect(pause).toHaveBeenCalledTimes(1);
		expect(getByRole("button", { name: "Play" })).toBeTruthy();
	});

	test("never seeks back while the track plays on", async () => {
		const { container } = renderPlayer();
		const audio = container.querySelector("audio") as HTMLAudioElement;
		Object.defineProperty(audio, "duration", {
			configurable: true,
			value: 55,
		});
		audio.dispatchEvent(new Event("durationchange"));
		await tick();
		audio.currentTime = 0.4;
		audio.dispatchEvent(new Event("timeupdate"));
		await tick();
		expect(audio.currentTime).toBe(0.4);
	});

	test("turns the volume down from its popover", async () => {
		const { getByRole, container } = renderPlayer();
		const audio = container.querySelector("audio") as HTMLAudioElement;
		await fireEvent.click(getByRole("button", { name: "Volume" }));
		await tick();
		const thumb = document.querySelector(
			'[role="slider"][aria-label="Volume"]',
		) as HTMLElement;
		expect(thumb.getAttribute("aria-valuetext")).toBe("100%");
		await fireEvent.keyDown(thumb, { key: "Home" });
		await tick();
		expect(audio.volume).toBe(0);
		expect(thumb.getAttribute("aria-valuetext")).toBe("0%");
	});

	test("moves through the queue and keeps playing", async () => {
		const onchange = mock();
		const { getByText, getByRole, container } = renderPlayer({
			paused: false,
			onchange,
		});
		await tick();
		expect(play).toHaveBeenCalledTimes(1);

		await fireEvent.click(getByRole("button", { name: "Next" }));
		await tick();
		expect(getByText("Second song")).toBeTruthy();
		expect(onchange).toHaveBeenLastCalledWith(tracks[1], 1);
		expect(container.querySelector("audio")?.getAttribute("src")).toBe(
			tracks[1]?.src,
		);
		expect(play).toHaveBeenCalledTimes(2);

		await fireEvent.click(getByRole("button", { name: "Previous" }));
		await tick();
		expect(getByText("First song")).toBeTruthy();
		expect(onchange).toHaveBeenLastCalledWith(tracks[0], 0);
	});

	test("restarts the track instead of going back once it is under way", async () => {
		const onchange = mock();
		const { getByText, getByRole, container } = renderPlayer({
			index: 1,
			onchange,
		});
		const audio = container.querySelector("audio");
		if (!audio) {
			throw new Error("No audio element");
		}
		audio.currentTime = 42;
		await fireEvent(audio, new Event("timeupdate"));

		await fireEvent.click(getByRole("button", { name: "Previous" }));
		await tick();
		expect(audio.currentTime).toBe(0);
		expect(getByText("Second song")).toBeTruthy();
		expect(onchange).not.toHaveBeenCalled();
	});

	test("goes on to the next track when one ends, and stops after the last", async () => {
		const onended = mock();
		const { getByText, getByRole, container } = renderPlayer({
			index: 1,
			onended,
		});
		const audio = container.querySelector("audio");
		if (!audio) {
			throw new Error("No audio element");
		}

		await fireEvent(audio, new Event("ended"));
		await tick();
		expect(onended).toHaveBeenCalledWith(tracks[1], 1);
		expect(getByText("Third song")).toBeTruthy();
		expect(play).toHaveBeenCalledTimes(1);
		expect(getByRole("button", { name: "Next" }).hasAttribute("disabled")).toBe(
			true,
		);

		await fireEvent(audio, new Event("ended"));
		await tick();
		expect(onended).toHaveBeenLastCalledWith(tracks[2], 2);
		expect(getByText("Third song")).toBeTruthy();
	});

	test("speaks the app's words where it gives them", () => {
		const { getByRole } = renderPlayer({
			messages: { play: "Lecture", player: "Lecteur" },
		});
		expect(getByRole("region", { name: "Lecteur" })).toBeTruthy();
		expect(getByRole("button", { name: "Lecture" })).toBeTruthy();
		expect(getByRole("button", { name: "Next" })).toBeTruthy();
	});

	test("renders nothing without a track", () => {
		const { queryByRole } = renderPlayer({ tracks: [] });
		expect(queryByRole("region")).toBeNull();
	});
});
