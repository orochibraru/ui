import { type Component } from "svelte";
/**
 * An action in the page header: a link or a button. A primary action shows as a filled button on desktop only, since
 * phones reach it through the floating button.
 */
export interface HeaderAction {
    label: string;
    icon: Component<{
        class?: string;
    }>;
    href?: string;
    onSelect?: () => void;
    primary?: boolean;
}
export declare class PageTitle {
    current: string;
    backHref: string | undefined;
    actions: HeaderAction[];
}
type Value<Type> = Type | (() => Type);
/** Creates the page title holder for this app instance; the root layout calls it once. */
export declare function providePageTitle(): PageTitle;
/** The page title holder, for the app bars. */
export declare function usePageTitle(): PageTitle;
/**
 * Sets the title the app bar shows for the current page, where its back button goes and the icon links on its right;
 * call it while a page or layout initialises. Pass functions to follow data that changes while the component stays
 * mounted.
 */
export declare function setPageTitle(title: Value<string>, backHref?: Value<string | undefined>, actions?: Value<HeaderAction[]>): void;
export {};
