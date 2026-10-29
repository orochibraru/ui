import { type VariantProps } from "tailwind-variants";
export declare const alertVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: "bg-card text-card-foreground";
        destructive: "text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current";
    };
}, undefined, "grid gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 group/alert relative w-full", {
    variant: {
        default: "bg-card text-card-foreground";
        destructive: "text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current";
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    variant: {
        default: "bg-card text-card-foreground";
        destructive: "text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current";
    };
}, undefined>>;
export type AlertVariant = VariantProps<typeof alertVariants>["variant"];
import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: AlertVariant;
};
declare const Alert: import("svelte").Component<$$ComponentProps, {}, "ref">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
