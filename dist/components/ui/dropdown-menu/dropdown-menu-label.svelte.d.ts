import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    inset?: boolean;
};
declare const DropdownMenuLabel: import("svelte").Component<$$ComponentProps, {}, "ref">;
type DropdownMenuLabel = ReturnType<typeof DropdownMenuLabel>;
export default DropdownMenuLabel;
