<script lang="ts">
	import { Button } from "#lib/components/ui/button/index.js";
	import { haptic } from "#lib/haptics.js";
</script>

<div class="flex flex-wrap gap-2">
	<Button variant="outline" onclick={() => haptic("tap")}>Tap</Button>
	<Button variant="outline" onclick={() => haptic("success")}>Success</Button>
	<Button variant="outline" onclick={() => haptic("error")}>Error</Button>
</div>
