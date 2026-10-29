import { type VariantProps } from "tailwind-variants";
declare const inputGroupButtonVariants: import("tailwind-variants").TVReturnType<{
    size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)_-_5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5";
        sm: "";
        "icon-xs": "size-6 rounded-[calc(var(--radius)_-_5px)] p-0 has-[>svg]:p-0";
        "icon-sm": "size-8 p-0 has-[>svg]:p-0";
    };
}, undefined, "gap-2 text-sm flex items-center shadow-none", {
    size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)_-_5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5";
        sm: "";
        "icon-xs": "size-6 rounded-[calc(var(--radius)_-_5px)] p-0 has-[>svg]:p-0";
        "icon-sm": "size-8 p-0 has-[>svg]:p-0";
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)_-_5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5";
        sm: "";
        "icon-xs": "size-6 rounded-[calc(var(--radius)_-_5px)] p-0 has-[>svg]:p-0";
        "icon-sm": "size-8 p-0 has-[>svg]:p-0";
    };
}, undefined>>;
export type InputGroupButtonSize = VariantProps<typeof inputGroupButtonVariants>["size"];
import type { ComponentProps } from "svelte";
import { Button } from "../button/index.js";
type $$ComponentProps = Omit<ComponentProps<typeof Button>, "href" | "size"> & {
    size?: InputGroupButtonSize;
};
declare const InputGroupButton: import("svelte").Component<$$ComponentProps, {}, "ref">;
type InputGroupButton = ReturnType<typeof InputGroupButton>;
export default InputGroupButton;
