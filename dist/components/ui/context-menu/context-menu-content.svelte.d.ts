import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import type { WithoutChildrenOrChild } from "../../../utils.js";
import ContextMenuPortal from "./context-menu-portal.svelte";
type $$ComponentProps = ContextMenuPrimitive.ContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof ContextMenuPortal>>;
};
declare const ContextMenuContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ContextMenuContent = ReturnType<typeof ContextMenuContent>;
export default ContextMenuContent;
