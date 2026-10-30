const pinnedProperties = ["position", "top", "left", "right", "width"] as const;
const unlockWaitMs = 1000;

let holders = 0;
let saved: { y: number; values: Record<string, [string, string]> } | null =
	null;
let stopWaiting: (() => void) | null = null;

function isSafari(): boolean {
	return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function unpin(): void {
	if (holders > 0 || !saved) {
		return;
	}
	const { style } = document.body;
	for (const [name, [value, priority]] of Object.entries(saved.values)) {
		if (value) {
			style.setProperty(name, value, priority);
		} else {
			style.removeProperty(name);
		}
	}
	window.scrollTo(0, saved.y);
	saved = null;
}

function unpinOnceUnlocked(): void {
	const unlocked = () => document.body.style.overflow !== "hidden";
	if (unlocked()) {
		unpin();
		return;
	}
	const observer = new MutationObserver(() => {
		if (unlocked()) {
			finish();
		}
	});
	const timer = window.setTimeout(() => finish(), unlockWaitMs);
	const finish = () => {
		observer.disconnect();
		window.clearTimeout(timer);
		stopWaiting = null;
		unpin();
	};
	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ["style"],
	});
	stopWaiting = () => {
		observer.disconnect();
		window.clearTimeout(timer);
		stopWaiting = null;
	};
}

/**
 * Pins the page behind an open drawer with `position: fixed` at its scroll offset, as vaul does on Safari: vaul's drag
 * guard then never mistakes the scrolled page for scrolled drawer content. Safari is left to vaul. Returns the unpin,
 * which puts the page back once the dialog's scroll lock lets go, so the restored scroll sticks.
 */
export function pinPage(): () => void {
	if (typeof document === "undefined" || isSafari()) {
		return () => undefined;
	}
	holders += 1;
	stopWaiting?.();
	if (!saved) {
		const { style } = document.body;
		saved = {
			y: window.scrollY,
			values: Object.fromEntries(
				pinnedProperties.map((name) => [
					name,
					[style.getPropertyValue(name), style.getPropertyPriority(name)],
				]),
			),
		};
		style.setProperty("position", "fixed", "important");
		style.setProperty("top", `${-saved.y}px`);
		style.setProperty("left", "0px");
		style.setProperty("right", "0px");
		style.setProperty("width", "100%");
	}
	let released = false;
	return () => {
		if (released) {
			return;
		}
		released = true;
		holders -= 1;
		if (holders === 0) {
			unpinOnceUnlocked();
		}
	};
}
