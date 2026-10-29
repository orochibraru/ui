import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    showCloseButton?: boolean;
};
declare const DialogFooter: import("svelte").Component<$$ComponentProps, {}, "ref">;
type DialogFooter = ReturnType<typeof DialogFooter>;
export default DialogFooter;
