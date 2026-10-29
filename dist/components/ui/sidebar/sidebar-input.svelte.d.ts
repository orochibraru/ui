declare const SidebarInput: import("svelte").Component<(Omit<import("svelte/elements").HTMLInputAttributes, "type"> & ({
    type: "file";
    files?: FileList;
} | {
    type?: "number" | "submit" | "reset" | "button" | "search" | "checkbox" | "radio" | (string & {}) | "text" | "tel" | "url" | "email" | "hidden" | "color" | "date" | "month" | "datetime-local" | "image" | "password" | "range" | "time" | "week";
    files?: undefined;
})) & {
    ref?: HTMLElement | null | undefined;
}, {}, "ref" | "value">;
type SidebarInput = ReturnType<typeof SidebarInput>;
export default SidebarInput;
