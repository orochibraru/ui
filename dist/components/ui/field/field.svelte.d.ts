import { type VariantProps } from "tailwind-variants";
export declare const fieldVariants: import("tailwind-variants").TVReturnType<{
    orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto";
        horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px";
        responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px";
    };
}, undefined, "data-[invalid=true]:text-destructive gap-3 group/field flex w-full", {
    orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto";
        horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px";
        responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px";
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto";
        horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px";
        responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px";
    };
}, undefined>>;
export type FieldOrientation = VariantProps<typeof fieldVariants>["orientation"];
import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    orientation?: FieldOrientation;
};
declare const Field: import("svelte").Component<$$ComponentProps, {}, "ref">;
type Field = ReturnType<typeof Field>;
export default Field;
