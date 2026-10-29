import { Menubar as MenubarPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import MenubarPortal from "./menubar-portal.svelte";
type $$ComponentProps = MenubarPrimitive.SubContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof MenubarPortal>>;
};
declare const MenubarSubContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type MenubarSubContent = ReturnType<typeof MenubarSubContent>;
export default MenubarSubContent;
