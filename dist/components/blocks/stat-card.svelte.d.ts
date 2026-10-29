import type { Component } from "svelte";
interface Props {
    label: string;
    value: string | number;
    hint?: string;
    href?: string;
    icon: Component<{
        class?: string;
    }>;
    tone?: "default" | "positive" | "warning";
}
declare const StatCard: Component<Props, {}, "">;
type StatCard = ReturnType<typeof StatCard>;
export default StatCard;
