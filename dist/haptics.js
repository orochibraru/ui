const patterns = {
    tap: 10,
    success: 18,
    error: [30, 60, 30],
};
/** A short vibration for a primary action, on devices that support it; a no-op elsewhere, iOS included. */
export function haptic(kind) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(patterns[kind]);
    }
}
