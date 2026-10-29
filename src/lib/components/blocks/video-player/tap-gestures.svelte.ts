import {
	DOUBLE_TAP_MS,
	type GestureZone,
	isDoubleTap,
	type TapPoint,
} from "#lib/components/blocks/video-player/gestures.js";
import { SEEK_SECONDS } from "#lib/components/blocks/video-player/keymap.js";

export interface SeekFeedback {
	side: "left" | "right";
	seconds: number;
}

const FEEDBACK_MS = 700;

/**
 * Taps on the picture on a touch screen. A tap in the middle runs `onTap` at once; on a side it waits out the
 * double-tap window, and a second tap there seeks instead, as does each further quick tap, adding up.
 */
export class TapGestures {
	feedback = $state<SeekFeedback | null>(null);

	#seek: (delta: number) => void;
	#onTap: () => void;
	#lastTap: (TapPoint & { zone: GestureZone }) | null = null;
	#burst: { side: "left" | "right"; until: number; seconds: number } | null =
		null;
	#tapTimer: ReturnType<typeof setTimeout> | undefined;
	#feedbackTimer: ReturnType<typeof setTimeout> | undefined;

	constructor(actions: { seek: (delta: number) => void; onTap: () => void }) {
		this.#seek = actions.seek;
		this.#onTap = actions.onTap;
	}

	tap = (point: TapPoint, zone: GestureZone) => {
		clearTimeout(this.#tapTimer);
		if (zone === "center") {
			this.#burst = null;
			this.#lastTap = null;
			this.#onTap();
			return;
		}
		const inBurst =
			this.#burst?.side === zone && point.time <= this.#burst.until;
		if (
			inBurst ||
			(this.#lastTap?.zone === zone && isDoubleTap(this.#lastTap, point))
		) {
			this.#lastTap = null;
			this.#seekSide(zone, point.time);
			return;
		}
		this.#burst = null;
		this.#lastTap = { ...point, zone };
		this.#tapTimer = setTimeout(() => {
			this.#lastTap = null;
			this.#onTap();
		}, DOUBLE_TAP_MS);
	};

	dispose = () => {
		clearTimeout(this.#tapTimer);
		clearTimeout(this.#feedbackTimer);
	};

	#seekSide(side: "left" | "right", time: number) {
		this.#seek(side === "left" ? -SEEK_SECONDS : SEEK_SECONDS);
		const seconds =
			(this.#burst?.side === side ? this.#burst.seconds : 0) + SEEK_SECONDS;
		this.#burst = { side, until: time + DOUBLE_TAP_MS, seconds };
		this.feedback = { side, seconds };
		clearTimeout(this.#feedbackTimer);
		this.#feedbackTimer = setTimeout(() => {
			this.feedback = null;
		}, FEEDBACK_MS);
	}
}
