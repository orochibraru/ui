import type { Component, Snippet } from "svelte";
interface Props {
    icon: Component<{
        class?: string;
    }>;
    title: string;
    subtitle?: string;
    children?: Snippet;
    class?: string;
}
declare const EmptyState: Component<Props, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
