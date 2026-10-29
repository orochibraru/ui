import { type VariantProps } from "tailwind-variants";
export declare const toggleVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: "bg-transparent";
        outline: "border-input hover:bg-muted border bg-transparent shadow-xs";
    };
    size: {
        default: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2";
        sm: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5";
        lg: "h-10 min-w-10 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2";
    };
}, undefined, "hover:text-foreground aria-pressed:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive gap-1 rounded-md text-sm font-medium transition-[color,box-shadow] [&_svg:not([class*='size-'])]:size-4 group/toggle inline-flex items-center justify-center whitespace-nowrap outline-none hover:bg-muted focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
    variant: {
        default: "bg-transparent";
        outline: "border-input hover:bg-muted border bg-transparent shadow-xs";
    };
    size: {
        default: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2";
        sm: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5";
        lg: "h-10 min-w-10 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2";
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    variant: {
        default: "bg-transparent";
        outline: "border-input hover:bg-muted border bg-transparent shadow-xs";
    };
    size: {
        default: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2";
        sm: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5";
        lg: "h-10 min-w-10 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2";
    };
}, undefined>>;
export type ToggleVariant = VariantProps<typeof toggleVariants>["variant"];
export type ToggleSize = VariantProps<typeof toggleVariants>["size"];
export type ToggleVariants = VariantProps<typeof toggleVariants>;
import { Toggle as TogglePrimitive } from "bits-ui";
type $$ComponentProps = TogglePrimitive.RootProps & {
    variant?: ToggleVariant;
    size?: ToggleSize;
};
declare const Toggle: import("svelte").Component<$$ComponentProps, {}, "ref" | "pressed">;
type Toggle = ReturnType<typeof Toggle>;
export default Toggle;
