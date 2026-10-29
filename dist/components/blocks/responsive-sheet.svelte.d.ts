import type { Snippet } from "svelte";
interface Props {
    open: boolean;
    title: string;
    description?: string;
    wide?: boolean;
    children: Snippet;
}
declare const ResponsiveSheet: import("svelte").Component<Props, {}, "open">;
type ResponsiveSheet = ReturnType<typeof ResponsiveSheet>;
export default ResponsiveSheet;
