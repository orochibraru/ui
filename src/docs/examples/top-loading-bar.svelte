<script lang="ts">
	import { goto } from "$app/navigation";

	import { Button } from "#lib/components/ui/button/index.js";
</script>

<div class="grid justify-items-start gap-4">
	<p class="text-muted-foreground text-sm">
		Watch the top of the screen: this button reloads the page through a load
		function that takes a second and a half, and the bar creeps until it lands.
	</p>
	<Button
		variant="outline"
		onclick={() => goto(`?slow=${Date.now()}`, { reset: false })}
	>
		Load this page slowly
	</Button>
</div>
