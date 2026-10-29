import type { HTMLAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
type $$ComponentProps = WithElementRef<HTMLAttributes<HTMLLegendElement>> & {
    variant?: "legend" | "label";
};
declare const FieldLegend: import("svelte").Component<$$ComponentProps, {}, "ref">;
type FieldLegend = ReturnType<typeof FieldLegend>;
export default FieldLegend;
