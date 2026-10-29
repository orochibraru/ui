<script lang="ts">
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import CodeIcon from "@lucide/svelte/icons/code";
	import TypeIcon from "@lucide/svelte/icons/type";

	import OptionGroup from "#lib/components/blocks/option-group.svelte";

	const fonts = [
		{
			value: "default",
			label: "Default",
			description: "The app's own typefaces.",
			icon: TypeIcon,
		},
		{
			value: "serif",
			label: "Serif",
			description: "A classic book face for a calmer read.",
			icon: BookOpenIcon,
		},
		{
			value: "mono",
			label: "Mono",
			description: "Every character the same width.",
			icon: CodeIcon,
		},
	];

	const accents = [
		{ value: "blue", label: "Blue", color: "oklch(0.6 0.19 255)" },
		{ value: "green", label: "Green", color: "oklch(0.6 0.14 165)" },
		{ value: "rose", label: "Rose", color: "oklch(0.6 0.2 12)" },
	];

	let font = $state("default");
	let accent = $state("blue");
</script>

<div class="grid gap-6">
	<OptionGroup
		name="font"
		legend="Font"
		options={fonts}
		bind:value={font}
		onchange={() => {}}
	/>
	<OptionGroup
		name="accent"
		legend="Accent"
		options={accents}
		bind:value={accent}
		onchange={() => {}}
	>
		{#snippet swatch(option)}
			<span
				class="size-5 rounded-full"
				style:background={accents.find((item) => item.value === option.value)
					?.color}
			></span>
		{/snippet}
	</OptionGroup>
</div>
