<script lang="ts">
	import { resolve } from "$app/paths";

	import { Button } from "#lib/components/ui/button/index.js";
</script>

<div class="grid justify-items-start gap-4">
	<p class="text-muted-foreground text-sm">
		One real route per tab, under a layout that renders the section. The live
		demo below is the code on this page: on desktop it opens the first tab, on
		phones it lists the tabs as cards.
	</p>
	<Button href={resolve("/section")}>Open the demo section</Button>
</div>
