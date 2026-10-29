import { Command as CommandPrimitive } from "bits-ui";
type $$ComponentProps = CommandPrimitive.InputProps & {
    wrapperClass?: string;
    groupClass?: string;
};
declare const CommandInput: import("svelte").Component<$$ComponentProps, {}, "ref" | "value">;
type CommandInput = ReturnType<typeof CommandInput>;
export default CommandInput;
