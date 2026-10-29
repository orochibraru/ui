import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { type WithoutChild } from "../../../utils.js";
import type { WithoutChildrenOrChild } from "../../../utils.js";
import SelectPortal from "./select-portal.svelte";
type $$ComponentProps = WithoutChild<SelectPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SelectPortal>>;
};
declare const SelectContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type SelectContent = ReturnType<typeof SelectContent>;
export default SelectContent;
