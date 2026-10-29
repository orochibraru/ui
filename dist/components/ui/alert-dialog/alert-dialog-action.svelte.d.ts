import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { type ButtonSize, type ButtonVariant } from "../button/index.js";
type $$ComponentProps = AlertDialogPrimitive.ActionProps & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};
declare const AlertDialogAction: import("svelte").Component<$$ComponentProps, {}, "ref">;
type AlertDialogAction = ReturnType<typeof AlertDialogAction>;
export default AlertDialogAction;
