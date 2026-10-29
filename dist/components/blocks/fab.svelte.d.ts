import type { Component } from "svelte";
interface Props {
    label: string;
    icon: Component<{
        class?: string;
    }>;
    onclick: () => void;
}
declare const Fab: Component<Props, {}, "">;
type Fab = ReturnType<typeof Fab>;
export default Fab;
