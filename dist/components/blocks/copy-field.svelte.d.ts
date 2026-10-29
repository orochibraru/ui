declare const CopyField: import("svelte").Component<{
    value: string;
    label: string;
    messages?: Partial<{
        loading: string;
        success: string;
        error: string;
    }>;
}, {}, "">;
type CopyField = ReturnType<typeof CopyField>;
export default CopyField;
