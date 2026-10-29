import type { SubmitFunction } from "$app/forms";
import type { ExternalToast } from "svelte-sonner";
export type ActionData = Record<string, unknown> | undefined;
export interface ToastMessages {
    error?: string;
    loading: string;
    success: string | ((data: ActionData) => string);
}
export interface EnhanceToastOptions extends ToastMessages {
    action?: ExternalToast["action"];
    description?: string;
    onComplete?: () => void | Promise<void>;
    onFailure?: (data: ActionData) => void;
    onSettled?: () => void;
    onSubmit?: (input: Parameters<SubmitFunction>[0]) => void;
    onStart?: () => void;
    onSuccess?: (data: ActionData) => void | Promise<void>;
    /** Forwarded to `update()`; defaults to false because a DOM reset blanks `bind:value` fields. */
    reset?: boolean;
}
/**
 * Turns a thrown value into a toast message: the error's own message when it has
 * one, the message in a SvelteKit `HttpError`'s body (what a failed remote
 * function throws on the client, which isn't an `Error`), the fallback otherwise.
 */
export declare function toastError(error: unknown, fallback?: string): string;
/**
 * Builds a `use:enhance` submit function that narrates the form action through a
 * single promise toast (loading, then success or error) and runs the option
 * hooks around it. Failure messages come from the action's `error` field or the
 * first entry of its `errors` field map.
 *
 * @returns A SubmitFunction that calls `update()` with `reset: false` unless
 * `options.reset` says otherwise, and `navigate: false` so a form posting to
 * another route's action stays on the current page.
 */
export declare function enhanceToast(options: EnhanceToastOptions): SubmitFunction;
/**
 * Shorthand `enhanceToast` for a settings-style form that saves one section.
 *
 * @param sectionLabel The section's display name, e.g. "Email settings".
 */
export declare function saveToast(sectionLabel: string): SubmitFunction;
