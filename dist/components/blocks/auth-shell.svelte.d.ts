import type { Snippet } from "svelte";
interface Props {
    heading: string;
    subheading?: string;
    brand?: Snippet;
    children: Snippet;
    footer?: Snippet;
}
declare const AuthShell: import("svelte").Component<Props, {}, "">;
type AuthShell = ReturnType<typeof AuthShell>;
export default AuthShell;
