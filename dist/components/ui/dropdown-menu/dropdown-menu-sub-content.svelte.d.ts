import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import DropdownMenuPortal from "./dropdown-menu-portal.svelte";
type $$ComponentProps = DropdownMenuPrimitive.SubContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DropdownMenuPortal>>;
};
declare const DropdownMenuSubContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type DropdownMenuSubContent = ReturnType<typeof DropdownMenuSubContent>;
export default DropdownMenuSubContent;
