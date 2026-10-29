import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    child?: Snippet<[{
        props: Record<string, unknown>;
    }]>;
};
declare const ButtonGroupText: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ButtonGroupText = ReturnType<typeof ButtonGroupText>;
export default ButtonGroupText;
