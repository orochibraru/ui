export type GestureZone = "left" | "center" | "right";

export interface TapPoint {
	x: number;
	y: number;
	time: number;
}

/** Two taps further apart than this, in milliseconds, are two single taps. */
export const DOUBLE_TAP_MS = 300;
/** ... and further apart than this, in pixels, too. */
export const DOUBLE_TAP_DISTANCE = 60;

/** The left and right thirds seek on a double tap; the middle one doesn't. */
export function gestureZone(x: number, width: number): GestureZone {
	if (width <= 0) {
		return "center";
	}
	const ratio = x / width;
	if (ratio < 1 / 3) {
		return "left";
	}
	if (ratio > 2 / 3) {
		return "right";
	}
	return "center";
}

export function isDoubleTap(
	previous: TapPoint | null,
	next: TapPoint,
): boolean {
	if (!previous) {
		return false;
	}
	return (
		next.time - previous.time <= DOUBLE_TAP_MS &&
		Math.hypot(next.x - previous.x, next.y - previous.y) <= DOUBLE_TAP_DISTANCE
	);
}
