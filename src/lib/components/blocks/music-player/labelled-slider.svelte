<script lang="ts">
	import { Slider } from "#lib/components/ui/slider/index.js";

	interface Props {
		value: number;
		max: number;
		step: number;
		label: string;
		valueText: string;
		onchange: (value: number) => void;
		orientation?: "horizontal" | "vertical";
		disabled?: boolean;
		class?: string;
	}

	const { value, label, valueText, onchange, ...rest }: Props = $props();

	let ref: HTMLElement | null = $state(null);

	$effect(() => {
		const thumb = ref?.querySelector("[role=slider]");
		thumb?.setAttribute("aria-label", label);
		thumb?.setAttribute("aria-valuetext", valueText);
	});
</script>

<Slider bind:ref type="single" {value} onValueChange={onchange} {...rest} />
