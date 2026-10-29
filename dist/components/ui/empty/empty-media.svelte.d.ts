import { type VariantProps } from "tailwind-variants";
export declare const emptyMediaVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: "bg-transparent";
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6";
    };
}, undefined, "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0", {
    variant: {
        default: "bg-transparent";
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6";
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    variant: {
        default: "bg-transparent";
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6";
    };
}, undefined>>;
export type EmptyMediaVariant = VariantProps<typeof emptyMediaVariants>["variant"];
import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: EmptyMediaVariant;
};
declare const EmptyMedia: import("svelte").Component<$$ComponentProps, {}, "ref">;
type EmptyMedia = ReturnType<typeof EmptyMedia>;
export default EmptyMedia;
