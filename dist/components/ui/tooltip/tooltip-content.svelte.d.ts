import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import type { WithoutChildrenOrChild } from "../../../utils.js";
import TooltipPortal from "./tooltip-portal.svelte";
type $$ComponentProps = TooltipPrimitive.ContentProps & {
    arrowClasses?: string;
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipPortal>>;
};
declare const TooltipContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type TooltipContent = ReturnType<typeof TooltipContent>;
export default TooltipContent;
