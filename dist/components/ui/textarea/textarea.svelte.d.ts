import type { HTMLTextareaAttributes } from "svelte/elements";
import { type WithElementRef } from "../../../utils.js";
declare const Textarea: import("svelte").Component<Omit<WithElementRef<HTMLTextareaAttributes>, "children">, {}, "ref" | "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
