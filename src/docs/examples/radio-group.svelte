<script lang="ts">
	import { Label } from "#lib/components/ui/label/index.js";
	import * as RadioGroup from "#lib/components/ui/radio-group/index.js";

	let notify = $state("all");
</script>

<div class="flex flex-col gap-4">
	<RadioGroup.Root bind:value={notify}>
		<div class="flex items-center gap-2">
			<RadioGroup.Item value="all" id="notify-all" />
			<Label for="notify-all">All new messages</Label>
		</div>
		<div class="flex items-center gap-2">
			<RadioGroup.Item value="mentions" id="notify-mentions" />
			<Label for="notify-mentions">Mentions only</Label>
		</div>
		<div class="flex items-center gap-2">
			<RadioGroup.Item value="none" id="notify-none" />
			<Label for="notify-none">Nothing</Label>
		</div>
	</RadioGroup.Root>
	<p class="text-muted-foreground text-sm">Selected: {notify}</p>
</div>
