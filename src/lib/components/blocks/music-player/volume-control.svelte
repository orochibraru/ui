<script lang="ts">
	import Volume1Icon from "@lucide/svelte/icons/volume-1";
	import Volume2Icon from "@lucide/svelte/icons/volume-2";
	import VolumeXIcon from "@lucide/svelte/icons/volume-x";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Popover from "#lib/components/ui/popover/index.js";

	import LabelledSlider from "./labelled-slider.svelte";

	interface Props {
		volume: number;
		label: string;
	}

	let { volume = $bindable(1), label }: Props = $props();

	const Icon = $derived(
		volume === 0 ? VolumeXIcon : volume < 0.5 ? Volume1Icon : Volume2Icon,
	);
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="ghost"
				size="icon"
				aria-label={label}
				class="size-11 rounded-full md:size-9"
			>
				<Icon class="size-5" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="glass w-auto items-center rounded-2xl p-4">
		<LabelledSlider
			orientation="vertical"
			value={volume}
			max={1}
			step={0.01}
			{label}
			valueText={`${Math.round(volume * 100)}%`}
			onchange={(value) => (volume = value)}
		/>
	</Popover.Content>
</Popover.Root>
