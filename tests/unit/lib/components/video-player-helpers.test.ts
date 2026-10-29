import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";

import {
	chapterAt,
	formatTime,
} from "#lib/components/blocks/video-player/format.js";
import {
	gestureZone,
	isDoubleTap,
} from "#lib/components/blocks/video-player/gestures.js";
import { handlePlayerKey } from "#lib/components/blocks/video-player/keymap.js";
import { TapGestures } from "#lib/components/blocks/video-player/tap-gestures.svelte.js";

function actions() {
	return {
		togglePlay: mock(),
		seek: mock(),
		adjustVolume: mock(),
		toggleMute: mock(),
		toggleFullscreen: mock(),
		cycleSubtitles: mock(),
	};
}

function key(
	value: string,
	options: { target?: unknown; metaKey?: boolean } = {},
): KeyboardEvent {
	return {
		key: value,
		target: options.target ?? null,
		metaKey: options.metaKey ?? false,
		ctrlKey: false,
		altKey: false,
		preventDefault: mock(),
	} as unknown as KeyboardEvent;
}

function focused(matches: (selector: string) => boolean) {
	return { closest: (selector: string) => (matches(selector) ? {} : null) };
}

describe("formatTime", () => {
	test("reads m:ss under an hour and h:mm:ss past it", () => {
		expect(formatTime(0)).toBe("0:00");
		expect(formatTime(65.9)).toBe("1:05");
		expect(formatTime(3725)).toBe("1:02:05");
	});

	test("reads 0:00 for anything not a real time", () => {
		expect(formatTime(Number.NaN)).toBe("0:00");
		expect(formatTime(Number.POSITIVE_INFINITY)).toBe("0:00");
		expect(formatTime(-4)).toBe("0:00");
	});
});

describe("chapterAt", () => {
	const chapters = [{ start: 0, title: "One" }, { start: 60 }];

	test("finds the chapter a time falls in", () => {
		expect(chapterAt(chapters, 30)?.title).toBe("One");
		expect(chapterAt(chapters, 60)?.start).toBe(60);
		expect(chapterAt([{ start: 10 }], 5)).toBeNull();
	});
});

describe("handlePlayerKey", () => {
	test("maps the shortcuts and takes the key", () => {
		const run = actions();
		const space = key(" ");
		expect(handlePlayerKey(space, run)).toBe(true);
		expect(space.preventDefault).toHaveBeenCalled();
		handlePlayerKey(key("k"), run);
		expect(run.togglePlay).toHaveBeenCalledTimes(2);
		handlePlayerKey(key("j"), run);
		handlePlayerKey(key("ArrowRight"), run);
		expect(run.seek.mock.calls).toEqual([[-10], [10]]);
		handlePlayerKey(key("ArrowUp"), run);
		handlePlayerKey(key("ArrowDown"), run);
		expect(run.adjustVolume.mock.calls).toEqual([[0.1], [-0.1]]);
		handlePlayerKey(key("m"), run);
		handlePlayerKey(key("f"), run);
		handlePlayerKey(key("c"), run);
		expect(run.toggleMute).toHaveBeenCalledTimes(1);
		expect(run.toggleFullscreen).toHaveBeenCalledTimes(1);
		expect(run.cycleSubtitles).toHaveBeenCalledTimes(1);
	});

	test("leaves other keys and browser shortcuts alone", () => {
		const run = actions();
		const other = key("x");
		expect(handlePlayerKey(other, run)).toBe(false);
		expect(other.preventDefault).not.toHaveBeenCalled();
		expect(handlePlayerKey(key("f", { metaKey: true }), run)).toBe(false);
		expect(run.toggleFullscreen).not.toHaveBeenCalled();
	});

	test("leaves keys to a focused field, and Space to a focused button", () => {
		const run = actions();
		const field = focused((selector) => selector.includes("input"));
		expect(handlePlayerKey(key("k", { target: field }), run)).toBe(false);
		const button = focused((selector) => selector.startsWith("button"));
		expect(handlePlayerKey(key(" ", { target: button }), run)).toBe(false);
		expect(handlePlayerKey(key("ArrowLeft", { target: button }), run)).toBe(
			true,
		);
		expect(run.togglePlay).not.toHaveBeenCalled();
		expect(run.seek).toHaveBeenCalledWith(-10);
	});
});

describe("gestures", () => {
	test("splits the picture in thirds", () => {
		expect(gestureZone(10, 300)).toBe("left");
		expect(gestureZone(150, 300)).toBe("center");
		expect(gestureZone(290, 300)).toBe("right");
		expect(gestureZone(10, 0)).toBe("center");
	});

	test("counts two close, quick taps as a double tap", () => {
		const first = { x: 10, y: 10, time: 0 };
		expect(isDoubleTap(null, first)).toBe(false);
		expect(isDoubleTap(first, { x: 20, y: 15, time: 200 })).toBe(true);
		expect(isDoubleTap(first, { x: 20, y: 15, time: 400 })).toBe(false);
		expect(isDoubleTap(first, { x: 200, y: 15, time: 100 })).toBe(false);
	});
});

describe("TapGestures", () => {
	let gestures: TapGestures;
	const seek = mock();
	const onTap = mock();

	beforeEach(() => {
		seek.mockClear();
		onTap.mockClear();
		gestures = new TapGestures({ seek, onTap });
	});

	afterEach(() => gestures.dispose());

	test("runs a tap in the middle at once", () => {
		gestures.tap({ x: 150, y: 50, time: 0 }, "center");
		expect(onTap).toHaveBeenCalledTimes(1);
		expect(seek).not.toHaveBeenCalled();
	});

	test("seeks on a double tap on a side, adding up further taps", () => {
		gestures.tap({ x: 280, y: 50, time: 0 }, "right");
		gestures.tap({ x: 282, y: 52, time: 150 }, "right");
		gestures.tap({ x: 282, y: 52, time: 300 }, "right");
		expect(seek.mock.calls).toEqual([[10], [10]]);
		expect(gestures.feedback).toEqual({ side: "right", seconds: 20 });
		expect(onTap).not.toHaveBeenCalled();
	});

	test("runs a lone side tap once the double-tap window is over", async () => {
		gestures.tap({ x: 10, y: 50, time: 0 }, "left");
		expect(onTap).not.toHaveBeenCalled();
		await Bun.sleep(350);
		expect(onTap).toHaveBeenCalledTimes(1);
		expect(seek).not.toHaveBeenCalled();
	});
});
