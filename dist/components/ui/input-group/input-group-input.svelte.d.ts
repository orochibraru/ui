declare const InputGroupInput: import("svelte").Component<(Omit<import("svelte/elements").HTMLInputAttributes, "type"> & ({
    type: "file";
    files?: FileList;
} | {
    type?: "number" | "submit" | "reset" | "button" | "search" | "checkbox" | "radio" | (string & {}) | "text" | "tel" | "url" | "email" | "hidden" | "color" | "date" | "month" | "datetime-local" | "image" | "password" | "range" | "time" | "week";
    files?: undefined;
})) & {
    ref?: HTMLElement | null | undefined;
}, {}, "ref" | "value">;
type InputGroupInput = ReturnType<typeof InputGroupInput>;
export default InputGroupInput;
