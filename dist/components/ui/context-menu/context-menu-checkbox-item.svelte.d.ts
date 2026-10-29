import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = WithoutChildrenOrChild<ContextMenuPrimitive.CheckboxItemProps> & {
    inset?: boolean;
    children?: Snippet;
};
declare const ContextMenuCheckboxItem: import("svelte").Component<$$ComponentProps, {}, "ref" | "checked" | "indeterminate">;
type ContextMenuCheckboxItem = ReturnType<typeof ContextMenuCheckboxItem>;
export default ContextMenuCheckboxItem;
