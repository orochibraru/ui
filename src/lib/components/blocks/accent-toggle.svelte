<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";

	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";

	type Accent =
		| "blue"
		| "bordeaux"
		| "green"
		| "violet"
		| "rose"
		| "orange"
		| "amber"
		| "cyan"
		| "neutral";

	const defaultMessages = {
		label: "Accent",
		blue: "Blue",
		bordeaux: "Bordeaux",
		green: "Green",
		violet: "Violet",
		rose: "Rose",
		orange: "Orange",
		amber: "Amber",
		cyan: "Cyan",
		neutral: "Neutral",
	};

	interface Props {
		value?: Accent;
		onchange?: (accent: Accent) => void;
		messages?: Partial<typeof defaultMessages>;
	}

	let { value = $bindable("blue"), onchange, messages = {} }: Props = $props();

	const accents: Accent[] = [
		"blue",
		"bordeaux",
		"green",
		"violet",
		"rose",
		"orange",
		"amber",
		"cyan",
		"neutral",
	];

	const desktop = new MediaQuery("(min-width: 768px)");
	const text = $derived({ ...defaultMessages, ...messages });

	function pick(next: string) {
		if (!next) {
			return;
		}
		value = next as Accent;
		document.documentElement.dataset.accent = value;
		onchange?.(value);
	}
</script>

<ToggleGroup.Root
	type="single"
	variant="outline"
	orientation={desktop.current ? "horizontal" : "vertical"}
	aria-label={text.label}
	class="max-md:w-full"
	bind:value={() => value, pick}
>
	{#each accents as accent (accent)}
		<ToggleGroup.Item
			value={accent}
			aria-label={text[accent]}
			title={text[accent]}
			data-accent={accent}
			class="max-md:h-12 max-md:w-full max-md:justify-start max-md:gap-3 max-md:px-4 md:size-9"
		>
			<span
				class="size-3 rounded-full bg-[oklch(0.6_var(--primary-chroma)_var(--hue))]"
			></span>
			<span class="md:hidden">{text[accent]}</span>
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
