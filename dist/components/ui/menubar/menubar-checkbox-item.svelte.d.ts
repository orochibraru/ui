import { Menubar as MenubarPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = WithoutChildrenOrChild<MenubarPrimitive.CheckboxItemProps> & {
    inset?: boolean;
    children?: Snippet;
};
declare const MenubarCheckboxItem: import("svelte").Component<$$ComponentProps, {}, "ref" | "checked" | "indeterminate">;
type MenubarCheckboxItem = ReturnType<typeof MenubarCheckboxItem>;
export default MenubarCheckboxItem;
