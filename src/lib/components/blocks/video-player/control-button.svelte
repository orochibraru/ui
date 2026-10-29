<script lang="ts">
	import type { Snippet } from "svelte";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";
	import { cn } from "#lib/utils.js";

	interface Props {
		label: string;
		shortcut?: string;
		pressed?: boolean;
		portalTarget: HTMLElement | string;
		onclick: () => void;
		class?: string;
		children: Snippet;
	}

	const {
		label,
		shortcut,
		pressed,
		portalTarget,
		onclick,
		class: className,
		children,
	}: Props = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="ghost"
				size="icon"
				aria-label={label}
				aria-pressed={pressed}
				{onclick}
				class={cn(
					"size-11 rounded-full hover:bg-white/15 hover:text-white md:size-9 dark:hover:bg-white/15 [&_svg:not([class*='size-'])]:size-5",
					className,
				)}
			>
				{@render children()}
			</Button>
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Content portalProps={{ to: portalTarget }} sideOffset={6}>
		{label}
		{#if shortcut}
			<kbd class="font-sans opacity-60">{shortcut}</kbd>
		{/if}
	</Tooltip.Content>
</Tooltip.Root>
