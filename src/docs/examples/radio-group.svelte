<script lang="ts">
	import { Label } from "#lib/components/ui/label/index.js";
	import * as RadioGroup from "#lib/components/ui/radio-group/index.js";

	let split = $state("equal");
</script>

<div class="flex flex-col gap-4">
	<RadioGroup.Root bind:value={split}>
		<div class="flex items-center gap-2">
			<RadioGroup.Item value="equal" id="split-equal" />
			<Label for="split-equal">Split equally</Label>
		</div>
		<div class="flex items-center gap-2">
			<RadioGroup.Item value="shares" id="split-shares" />
			<Label for="split-shares">By shares</Label>
		</div>
		<div class="flex items-center gap-2">
			<RadioGroup.Item value="amounts" id="split-amounts" />
			<Label for="split-amounts">By exact amounts</Label>
		</div>
	</RadioGroup.Root>
	<p class="text-muted-foreground text-sm">Selected: {split}</p>
</div>
