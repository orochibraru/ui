import { type Snippet } from "svelte";
declare const InstallPrompt: import("svelte").Component<{
    appName: string;
    storageKey: string;
    brand?: Snippet;
    title?: string;
    messages?: Partial<{
        description: string;
        appleShare: string;
        appleAdd: string;
        menuOpen: string;
        menuInstall: string;
        gotIt: string;
        install: string;
        notNow: string;
    }>;
}, {}, "">;
type InstallPrompt = ReturnType<typeof InstallPrompt>;
export default InstallPrompt;
