declare const ErrorPage: import("svelte").Component<{
    homeHref: string;
    messages?: Partial<{
        notFoundTitle: string;
        notFoundDescription: string;
        errorTitle: string;
        errorId: string;
        home: string;
    }>;
}, {}, "">;
type ErrorPage = ReturnType<typeof ErrorPage>;
export default ErrorPage;
