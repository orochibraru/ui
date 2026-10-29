<script lang="ts" module>
	export type StatusTone =
		"neutral" | "positive" | "warning" | "negative" | "info";
</script>

<script lang="ts" generics="Status extends string">
	import { cn } from "#lib/utils.js";

	interface Props {
		status: Status;
		tones?: Partial<Record<Status, StatusTone>>;
		labels?: Partial<Record<Status, string>>;
		pulse?: boolean;
		class?: string;
	}

	const {
		status,
		tones = {},
		labels = {},
		pulse = false,
		class: className,
	}: Props = $props();

	const toneClasses: Record<StatusTone, string> = {
		neutral: "border-border bg-muted text-muted-foreground",
		positive: "border-positive/25 bg-positive/10 text-positive",
		warning:
			"border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
		negative: "border-negative/25 bg-negative/10 text-negative",
		info: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
	};

	const tone = $derived(tones[status] ?? "neutral");
</script>

<span
	data-tone={tone}
	class={cn(
		"inline-flex h-6 w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium whitespace-nowrap",
		toneClasses[tone],
		className,
	)}
>
	<span class="relative flex size-1.5 shrink-0" aria-hidden="true">
		{#if pulse}
			<span
				class="absolute inset-0 rounded-full bg-current opacity-60 motion-safe:animate-ping"
			></span>
		{/if}
		<span class="relative size-1.5 rounded-full bg-current"></span>
	</span>
	{labels[status] ?? status}
</span>
