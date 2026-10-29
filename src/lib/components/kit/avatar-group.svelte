<script lang="ts" module>
	export interface AvatarPerson {
		name: string;
		src?: string;
	}

	export function initials(name: string): string {
		return name
			.trim()
			.split(/\s+/)
			.slice(0, 2)
			.map((word) => word.charAt(0))
			.join("")
			.toUpperCase();
	}
</script>

<script lang="ts">
	import * as Avatar from "#lib/components/ui/avatar/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";
	import { cn } from "#lib/utils.js";

	interface Props {
		people: AvatarPerson[];
		max?: number;
		size?: "sm" | "default" | "lg";
		class?: string;
	}

	const {
		people,
		max = 4,
		size = "default",
		class: className,
	}: Props = $props();

	const shown = $derived(people.slice(0, Math.max(0, max)));
	const hidden = $derived(people.slice(shown.length));
	const hiddenNames = $derived(hidden.map((person) => person.name).join(", "));

	const boxSizes = { sm: "size-6", default: "size-8", lg: "size-10" };
	const textSizes = {
		sm: "text-[0.625rem]",
		default: "text-xs",
		lg: "text-sm",
	};

	const triggerClass =
		"bg-background ring-background focus-visible:ring-ring/50 relative shrink-0 rounded-full ring-2 outline-none focus-visible:ring-3";
</script>

<div class={cn("flex w-fit items-center -space-x-2", className)}>
	{#each shown as person, index (index)}
		<Tooltip.Root>
			<Tooltip.Trigger class={triggerClass} aria-label={person.name}>
				<Avatar.Root {size}>
					{#if person.src}
						<Avatar.Image src={person.src} alt="" />
					{/if}
					<Avatar.Fallback class={cn("font-medium", textSizes[size])}>
						{initials(person.name)}
					</Avatar.Fallback>
				</Avatar.Root>
			</Tooltip.Trigger>
			<Tooltip.Content>{person.name}</Tooltip.Content>
		</Tooltip.Root>
	{/each}
	{#if hidden.length > 0}
		<Tooltip.Root>
			<Tooltip.Trigger class={triggerClass} aria-label={hiddenNames}>
				<span
					class={cn(
						"bg-muted text-muted-foreground tabular flex items-center justify-center rounded-full font-medium",
						boxSizes[size],
						textSizes[size],
					)}
				>
					+{hidden.length}
				</span>
			</Tooltip.Trigger>
			<Tooltip.Content>{hiddenNames}</Tooltip.Content>
		</Tooltip.Root>
	{/if}
</div>
