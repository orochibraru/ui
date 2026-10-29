import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { type WithoutChildrenOrChild } from "../../../utils.js";
import DialogPortal from "./dialog-portal.svelte";
type $$ComponentProps = WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
    children: Snippet;
    showCloseButton?: boolean;
};
declare const DialogContent: import("svelte").Component<$$ComponentProps, {}, "ref">;
type DialogContent = ReturnType<typeof DialogContent>;
export default DialogContent;
