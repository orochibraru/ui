import { type VariantProps } from "tailwind-variants";
export declare const tabsListVariants: import("tailwind-variants").TVReturnType<{
    variant: {
        default: "bg-muted";
        line: "gap-1 bg-transparent";
    };
}, undefined, "rounded-lg p-[3px] group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col", {
    variant: {
        default: "bg-muted";
        line: "gap-1 bg-transparent";
    };
}, undefined, import("tailwind-variants").TVReturnTypeLike<{
    variant: {
        default: "bg-muted";
        line: "gap-1 bg-transparent";
    };
}, undefined>>;
export type TabsListVariant = VariantProps<typeof tabsListVariants>["variant"];
import { Tabs as TabsPrimitive } from "bits-ui";
type $$ComponentProps = TabsPrimitive.ListProps & {
    variant?: TabsListVariant;
};
declare const TabsList: import("svelte").Component<$$ComponentProps, {}, "ref">;
type TabsList = ReturnType<typeof TabsList>;
export default TabsList;
