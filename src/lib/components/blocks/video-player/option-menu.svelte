<script lang="ts">
	import type { Snippet } from "svelte";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";
	import { cn } from "#lib/utils.js";

	interface Props {
		label: string;
		shortcut?: string;
		options: Array<{ value: string; label: string }>;
		value: string;
		active?: boolean;
		portalTarget: HTMLElement | string;
		onselect: (value: string) => void;
		onopenchange: (open: boolean) => void;
		children: Snippet;
	}

	const {
		label,
		shortcut,
		options,
		value,
		active = false,
		portalTarget,
		onselect,
		onopenchange,
		children,
	}: Props = $props();
</script>

<DropdownMenu.Root onOpenChange={onopenchange}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props: tooltipProps })}
				<DropdownMenu.Trigger {...tooltipProps}>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="ghost"
							size="icon"
							aria-label={label}
							class={cn(
								"size-11 rounded-full md:size-9 [&_svg]:size-5",
								active && "text-primary",
							)}
						>
							{@render children()}
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content portalProps={{ to: portalTarget }} sideOffset={6}>
			{label}
			{#if shortcut}
				<kbd class="font-sans opacity-60">{shortcut}</kbd>
			{/if}
		</Tooltip.Content>
	</Tooltip.Root>
	<DropdownMenu.Content
		portalProps={{ to: portalTarget }}
		side="top"
		align="end"
		sideOffset={12}
		class="w-44 rounded-2xl p-1.5"
	>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>{label}</DropdownMenu.GroupHeading>
			<DropdownMenu.RadioGroup {value} onValueChange={onselect}>
				{#each options as option (option.value)}
					<DropdownMenu.RadioItem
						value={option.value}
						closeOnSelect
						class="min-h-11 rounded-xl md:min-h-8"
					>
						<span class="truncate">{option.label}</span>
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
