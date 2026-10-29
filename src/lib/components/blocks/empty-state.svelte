<script lang="ts">
	import type { Component, Snippet } from "svelte";

	import { cn } from "#lib/utils.js";

	interface Props {
		icon: Component<{ class?: string }>;
		title: string;
		subtitle?: string;
		children?: Snippet;
		class?: string;
	}

	const {
		icon: Icon,
		title,
		subtitle,
		children,
		class: className,
	}: Props = $props();
</script>

<div
	class={cn(
		"flex flex-col items-center justify-center px-6 py-16 text-center",
		className,
	)}
>
	<div
		class="bg-accent text-accent-foreground mb-5 flex size-16 items-center justify-center rounded-2xl"
	>
		<Icon class="size-7" />
	</div>
	<p class="text-lg font-semibold tracking-tight">{title}</p>
	{#if subtitle}
		<p class="text-muted-foreground mt-1.5 max-w-xs text-sm text-pretty">
			{subtitle}
		</p>
	{/if}
	{#if children}
		<div class="mt-6">
			{@render children()}
		</div>
	{/if}
</div>
