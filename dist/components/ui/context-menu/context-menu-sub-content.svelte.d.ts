import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import ContextMenuPortal from "./context-menu-portal.svelte";
type $$ComponentProps = ContextMenuPrimitive.SubContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof ContextMenuPortal>>;
};
declare const ContextMenuSubContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ContextMenuSubContent = ReturnType<typeof ContextMenuSubContent>;
export default ContextMenuSubContent;
