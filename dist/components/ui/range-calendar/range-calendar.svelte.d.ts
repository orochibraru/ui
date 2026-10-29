import { type DateValue } from "@internationalized/date";
import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import type { ButtonVariant } from "../button/index.js";
import { type WithoutChildrenOrChild } from "../../../utils.js";
type $$ComponentProps = WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps> & {
    buttonVariant?: ButtonVariant;
    captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
    months?: RangeCalendarPrimitive.MonthSelectProps["months"];
    years?: RangeCalendarPrimitive.YearSelectProps["years"];
    monthFormat?: RangeCalendarPrimitive.MonthSelectProps["monthFormat"];
    yearFormat?: RangeCalendarPrimitive.YearSelectProps["yearFormat"];
    day?: Snippet<[{
        day: DateValue;
        outsideMonth: boolean;
    }]>;
};
declare const RangeCalendar: import("svelte").Component<$$ComponentProps, {}, "ref" | "placeholder" | "value">;
type RangeCalendar = ReturnType<typeof RangeCalendar>;
export default RangeCalendar;
