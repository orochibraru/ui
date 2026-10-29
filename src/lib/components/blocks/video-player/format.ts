/** A point on the timeline: a chapter start, or any marker worth a tick on the scrub bar. */
export interface Chapter {
	start: number;
	title?: string;
}

/** `h:mm:ss`, or `m:ss` under an hour; anything not finite reads `0:00`. */
export function formatTime(seconds: number): string {
	if (!Number.isFinite(seconds)) {
		return "0:00";
	}
	const total = Math.max(0, Math.floor(seconds));
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const rest = String(total % 60).padStart(2, "0");
	return hours > 0
		? `${hours}:${String(minutes).padStart(2, "0")}:${rest}`
		: `${minutes}:${rest}`;
}

/** The chapter playing at `time`, from a list sorted by start. */
export function chapterAt(chapters: Chapter[], time: number): Chapter | null {
	let current: Chapter | null = null;
	for (const chapter of chapters) {
		if (chapter.start > time) {
			break;
		}
		current = chapter;
	}
	return current;
}
