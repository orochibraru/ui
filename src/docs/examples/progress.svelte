<script lang="ts">
	import { Progress } from "#lib/components/ui/progress/index.js";

	const used = 62;
	const total = 100;
</script>

<div class="flex flex-col gap-2">
	<div class="flex justify-between text-sm">
		<span class="font-medium">Storage</span>
		<span class="text-muted-foreground">{used} GB of {total} GB</span>
	</div>
	<Progress value={used} max={total} />
</div>
