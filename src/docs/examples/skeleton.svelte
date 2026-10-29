<script lang="ts">
	import { Skeleton } from "#lib/components/ui/skeleton/index.js";
</script>

<div class="grid gap-4">
	{#each [1, 2, 3] as row (row)}
		<div class="flex items-center gap-3">
			<Skeleton class="size-10 shrink-0 rounded-full" />
			<div class="grid flex-1 gap-2">
				<Skeleton class="h-4 w-2/3" />
				<Skeleton class="h-4 w-1/3" />
			</div>
			<Skeleton class="h-4 w-16" />
		</div>
	{/each}
</div>
