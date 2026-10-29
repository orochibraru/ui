import { toast } from "svelte-sonner";
import { haptic } from "./haptics.js";
const DEFAULT_ERROR = "Something went wrong. Please try again.";
/**
 * Turns a thrown value into a toast message: the error's own message when it has
 * one, the message in a SvelteKit `HttpError`'s body (what a failed remote
 * function throws on the client, which isn't an `Error`), the fallback otherwise.
 */
export function toastError(error, fallback = DEFAULT_ERROR) {
    if (error instanceof Error && error.message) {
        return error.message;
    }
    const body = error?.body;
    if (typeof body?.message === "string" && body.message) {
        return body.message;
    }
    return fallback;
}
function resultError(result, fallback) {
    if (result.type === "error") {
        return new Error(toastError(result.error, fallback));
    }
    const data = result.data;
    const firstFieldError = data?.errors
        ? Object.values(data.errors).flat()[0]
        : undefined;
    return new Error(firstFieldError ?? data?.error ?? fallback);
}
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
export function enhanceToast(options) {
    const fallback = options.error ?? DEFAULT_ERROR;
    return (input) => {
        let settle;
        let fail;
        const submission = new Promise((resolve, reject) => {
            settle = resolve;
            fail = reject;
        });
        options.onStart?.();
        options.onSubmit?.(input);
        toast.promise(submission, {
            action: options.action,
            description: options.description,
            error: (error) => toastError(error, fallback),
            loading: options.loading,
            success: options.success,
        });
        return async ({ result, update }) => {
            options.onSettled?.();
            if (result.type === "failure" || result.type === "error") {
                options.onFailure?.(result.type === "failure" ? result.data : undefined);
                haptic("error");
                fail(resultError(result, fallback));
            }
            else {
                const data = result.type === "success" ? result.data : undefined;
                await options.onSuccess?.(data);
                settle(data);
            }
            await update({ navigate: false, reset: options.reset ?? false });
            await options.onComplete?.();
        };
    };
}
/**
 * Shorthand `enhanceToast` for a settings-style form that saves one section.
 *
 * @param sectionLabel The section's display name, e.g. "Email settings".
 */
export function saveToast(sectionLabel) {
    return enhanceToast({
        error: "Check the form for errors.",
        loading: `Saving ${sectionLabel.toLowerCase()}`,
        success: `${sectionLabel} saved.`,
    });
}
