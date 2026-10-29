import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    inset?: boolean;
};
declare const ContextMenuLabel: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ContextMenuLabel = ReturnType<typeof ContextMenuLabel>;
export default ContextMenuLabel;
