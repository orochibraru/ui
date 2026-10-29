import { getContext, setContext } from "svelte";
const key = Symbol("inside-drawer");
/** Marks what renders below as inside a drawer. */
export function markInsideDrawer() {
    setContext(key, true);
}
/** Whether this component renders inside a drawer, where a new drawer has to open as a nested one. */
export function isInsideDrawer() {
    return getContext(key) === true;
}
