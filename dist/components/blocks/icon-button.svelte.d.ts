import type { Component } from "svelte";
import { type ButtonProps } from "../ui/button/index.js";
type Props = Omit<ButtonProps, "children"> & {
    label: string;
    icon: Component<{
        class?: string;
    }>;
};
declare const IconButton: Component<Props, {}, "">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
