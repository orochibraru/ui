import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    children?: Snippet;
};
declare const FieldSeparator: import("svelte").Component<$$ComponentProps, {}, "ref">;
type FieldSeparator = ReturnType<typeof FieldSeparator>;
export default FieldSeparator;
