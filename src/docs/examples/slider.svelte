<script lang="ts">
	import { Slider } from "#lib/components/ui/slider/index.js";

	let limit = $state(450);
	let range = $state([20, 80]);
</script>

<div class="grid gap-8">
	<div class="grid gap-3">
		<div class="flex justify-between text-sm">
			<span>Storage limit</span>
			<span class="tabular">{limit} GB</span>
		</div>
		<Slider type="single" bind:value={limit} max={1000} step={10} />
	</div>
	<div class="grid gap-3">
		<div class="flex justify-between text-sm">
			<span>File size between</span>
			<span class="tabular">{range[0]} MB and {range[1]} MB</span>
		</div>
		<Slider type="multiple" bind:value={range} max={200} step={5} />
	</div>
	<Slider type="single" value={30} disabled />
</div>
