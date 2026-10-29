declare const patterns: {
    tap: number;
    success: number;
    error: number[];
};
/** A short vibration for a primary action, on devices that support it; a no-op elsewhere, iOS included. */
export declare function haptic(kind: keyof typeof patterns): void;
export {};
