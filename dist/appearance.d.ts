export interface AppearanceAttributes {
    accent: string;
    theme: string;
    darkVariant: string;
    font: string;
    corners: string;
}
/** Applies an appearance to `<html>`: data attributes for accent, dark variant, font and corners, the `dark` class for the theme. */
export declare function applyAppearance(root: HTMLElement, appearance: AppearanceAttributes, prefersDark: boolean): void;
/** An inline script applying `appearance` before first paint, so a reload never flashes the default theme. */
export declare function appearanceBootScript(appearance: AppearanceAttributes): string;
