<script lang="ts">
	import { Label } from "#lib/components/ui/label/index.js";
	import { Switch } from "#lib/components/ui/switch/index.js";

	let reminders = $state(true);
	let digest = $state(false);
</script>

<div class="grid gap-4">
	<div class="flex items-center gap-3">
		<Switch id="reminders" bind:checked={reminders} />
		<Label for="reminders">Payment reminders</Label>
	</div>
	<div class="flex items-center gap-3">
		<Switch id="digest" size="sm" bind:checked={digest} />
		<Label for="digest">Weekly digest {digest ? "on" : "off"}</Label>
	</div>
	<div class="flex items-center gap-3">
		<Switch id="bank-sync" disabled />
		<Label for="bank-sync">Bank sync (Pro plan)</Label>
	</div>
</div>
