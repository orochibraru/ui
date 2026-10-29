import { type VariantProps } from "tailwind-variants";
export declare const inputGroupAddonVariants: import("tailwind-variants").TVReturnType<{
    align: {
        "inline-start": "pl-2 has-[>button]:-ml-1 has-[>kbd]:ml-[-0.15rem] order-first";
        "inline-end": "pr-2 has-[>button]:-mr-1 has-[>kbd]:mr-[-0.15rem] order-last";
        "block-start": "px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start";
        "block-end": "px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start";
    };
}, undefined, "text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)_-_5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none", {
    align: {
        "inline-start": "pl-2 has-[>button]:-ml-1 has-[>kbd]:ml-[-0.15rem] order-first";
        "inline-end": "pr-2 has-[>button]:-mr-1 has-[>kbd]:mr-[-0.15rem] order-last";
        "block-start": "px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start";
        "block-end": "px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start";
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    align: {
        "inline-start": "pl-2 has-[>button]:-ml-1 has-[>kbd]:ml-[-0.15rem] order-first";
        "inline-end": "pr-2 has-[>button]:-mr-1 has-[>kbd]:mr-[-0.15rem] order-last";
        "block-start": "px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start";
        "block-end": "px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start";
    };
}, undefined>>;
export type InputGroupAddonAlign = VariantProps<typeof inputGroupAddonVariants>["align"];
import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    align?: InputGroupAddonAlign;
};
declare const InputGroupAddon: import("svelte").Component<$$ComponentProps, {}, "ref">;
type InputGroupAddon = ReturnType<typeof InputGroupAddon>;
export default InputGroupAddon;
