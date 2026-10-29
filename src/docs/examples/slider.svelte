<script lang="ts">
	import { Slider } from "#lib/components/ui/slider/index.js";

	let budget = $state(450);
	let range = $state([20, 80]);
</script>

<div class="grid gap-8">
	<div class="grid gap-3">
		<div class="flex justify-between text-sm">
			<span>Monthly budget</span>
			<span class="tabular">{budget} €</span>
		</div>
		<Slider type="single" bind:value={budget} max={1000} step={10} />
	</div>
	<div class="grid gap-3">
		<div class="flex justify-between text-sm">
			<span>Amount between</span>
			<span class="tabular">{range[0]} € and {range[1]} €</span>
		</div>
		<Slider type="multiple" bind:value={range} max={200} step={5} />
	</div>
	<Slider type="single" value={30} disabled />
</div>
