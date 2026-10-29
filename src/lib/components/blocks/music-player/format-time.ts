/** `m:ss`, or `h:mm:ss` past an hour; an unknown or endless duration reads `0:00`. */
export function formatTime(seconds: number): string {
	if (!Number.isFinite(seconds) || seconds < 0) {
		return "0:00";
	}
	const whole = Math.floor(seconds);
	const hours = Math.floor(whole / 3600);
	const minutes = Math.floor((whole % 3600) / 60);
	const rest = String(whole % 60).padStart(2, "0");
	return hours > 0
		? `${hours}:${String(minutes).padStart(2, "0")}:${rest}`
		: `${minutes}:${rest}`;
}
