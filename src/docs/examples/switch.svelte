<script lang="ts">
	import { Label } from "#lib/components/ui/label/index.js";
	import { Switch } from "#lib/components/ui/switch/index.js";

	let emails = $state(true);
	let digest = $state(false);
</script>

<div class="grid gap-4">
	<div class="flex items-center gap-3">
		<Switch id="emails" bind:checked={emails} />
		<Label for="emails">Email notifications</Label>
	</div>
	<div class="flex items-center gap-3">
		<Switch id="digest" size="sm" bind:checked={digest} />
		<Label for="digest">Weekly digest {digest ? "on" : "off"}</Label>
	</div>
	<div class="flex items-center gap-3">
		<Switch id="sso" disabled />
		<Label for="sso">Single sign-on (Pro plan)</Label>
	</div>
</div>
