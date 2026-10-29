<script lang="ts">
	import { cn } from "#lib/utils.js";

	let urgent = $state(false);
</script>

<button
	type="button"
	onclick={() => (urgent = !urgent)}
	class={cn(
		"bg-muted rounded-xl px-4 py-2 text-sm font-medium",
		urgent && "bg-destructive text-white",
	)}
>
	{urgent ? "Urgent" : "Normal"}: click to toggle
</button>
