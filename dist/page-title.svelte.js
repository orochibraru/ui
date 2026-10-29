import { getContext, setContext } from "svelte";
const key = Symbol("page-title");
export class PageTitle {
    current = $state("");
    backHref = $state();
    actions = $state([]);
}
function read(value) {
    return typeof value === "function" ? value() : value;
}
/** Creates the page title holder for this app instance; the root layout calls it once. */
export function providePageTitle() {
    return setContext(key, new PageTitle());
}
/** The page title holder, for the app bars. */
export function usePageTitle() {
    return getContext(key);
}
/**
 * Sets the title the app bar shows for the current page, where its back button goes and the icon links on its right;
 * call it while a page or layout initialises. Pass functions to follow data that changes while the component stays
 * mounted.
 */
export function setPageTitle(title, backHref, actions) {
    const holder = usePageTitle();
    const apply = () => {
        holder.current = read(title);
        holder.backHref = backHref === undefined ? undefined : read(backHref);
        holder.actions = actions === undefined ? [] : read(actions);
    };
    apply();
    $effect.pre(apply);
}
