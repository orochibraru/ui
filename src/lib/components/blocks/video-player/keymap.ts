export interface PlayerKeyActions {
	togglePlay: () => void;
	seek: (delta: number) => void;
	adjustVolume: (delta: number) => void;
	toggleMute: () => void;
	toggleFullscreen: () => void;
	cycleSubtitles: () => void;
}

export const SEEK_SECONDS = 10;
const VOLUME_STEP = 0.1;

const OWNS_KEYS =
	'input, textarea, select, [contenteditable="true"], [role="slider"], [role^="menuitem"], [role="option"]';
const ACTIVATES_ON_SPACE = 'button, a[href], [role="button"]';

function focusedOn(event: KeyboardEvent, selector: string): boolean {
	const target = event.target as {
		closest?: (selector: string) => unknown;
	} | null;
	return Boolean(target?.closest?.(selector));
}

function action(
	key: string,
	actions: PlayerKeyActions,
): (() => void) | undefined {
	switch (key) {
		case " ":
		case "k":
			return actions.togglePlay;
		case "ArrowLeft":
		case "j":
			return () => actions.seek(-SEEK_SECONDS);
		case "ArrowRight":
		case "l":
			return () => actions.seek(SEEK_SECONDS);
		case "ArrowUp":
			return () => actions.adjustVolume(VOLUME_STEP);
		case "ArrowDown":
			return () => actions.adjustVolume(-VOLUME_STEP);
		case "m":
			return actions.toggleMute;
		case "f":
			return actions.toggleFullscreen;
		case "c":
			return actions.cycleSubtitles;
		default:
			return undefined;
	}
}

/**
 * Runs the player shortcut for `event` and reports whether it took the key. Browser shortcuts (a modifier held), keys
 * a focused field or menu handles itself, and Space on a focused button are left alone.
 */
export function handlePlayerKey(
	event: KeyboardEvent,
	actions: PlayerKeyActions,
): boolean {
	if (event.ctrlKey || event.metaKey || event.altKey) {
		return false;
	}
	if (focusedOn(event, OWNS_KEYS)) {
		return false;
	}
	if (event.key === " " && focusedOn(event, ACTIVATES_ON_SPACE)) {
		return false;
	}
	const run = action(event.key, actions);
	if (!run) {
		return false;
	}
	event.preventDefault();
	run();
	return true;
}
