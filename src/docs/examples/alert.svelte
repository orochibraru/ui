<script lang="ts">
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
	import InfoIcon from "@lucide/svelte/icons/info";

	import * as Alert from "#lib/components/ui/alert/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
</script>

<div class="grid gap-3">
	<Alert.Root>
		<InfoIcon />
		<Alert.Title>Sync runs every hour</Alert.Title>
		<Alert.Description>
			Changes made on your other devices show up within the hour.
		</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="destructive">
		<CircleAlertIcon />
		<Alert.Title>Upload failed</Alert.Title>
		<Alert.Description>
			report.pdf is larger than the 25 MB limit.
		</Alert.Description>
		<Alert.Action>
			<Button size="sm" variant="outline">Retry</Button>
		</Alert.Action>
	</Alert.Root>
</div>
