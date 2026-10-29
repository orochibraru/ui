<script lang="ts">
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
	import InfoIcon from "@lucide/svelte/icons/info";

	import * as Alert from "#lib/components/ui/alert/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
</script>

<div class="grid gap-3">
	<Alert.Root>
		<InfoIcon />
		<Alert.Title>Bank sync runs every hour</Alert.Title>
		<Alert.Description>
			New transactions show up in your expenses within the hour.
		</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="destructive">
		<CircleAlertIcon />
		<Alert.Title>Deployment failed</Alert.Title>
		<Alert.Description>
			The health check on api-gateway timed out after 30 seconds.
		</Alert.Description>
		<Alert.Action>
			<Button size="sm" variant="outline">Retry</Button>
		</Alert.Action>
	</Alert.Root>
</div>
