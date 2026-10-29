import { Popover as PopoverPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import PopoverPortal from "./popover-portal.svelte";
type $$ComponentProps = PopoverPrimitive.ContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof PopoverPortal>>;
};
declare const PopoverContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type PopoverContent = ReturnType<typeof PopoverContent>;
export default PopoverContent;
