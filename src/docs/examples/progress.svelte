<script lang="ts">
	import { Progress } from "#lib/components/ui/progress/index.js";

	const spent = 620;
	const budget = 800;
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-between text-sm">
		<span class="font-medium">Groceries</span>
		<span class="text-muted-foreground">{spent} € of {budget} €</span>
	</div>
	<Progress value={spent} max={budget} />
</div>
