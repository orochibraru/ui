import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
    children?: Snippet;
};
declare const DropdownMenuCheckboxItem: import("svelte").Component<$$ComponentProps, {}, "ref" | "checked" | "indeterminate">;
type DropdownMenuCheckboxItem = ReturnType<typeof DropdownMenuCheckboxItem>;
export default DropdownMenuCheckboxItem;
