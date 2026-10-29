<script lang="ts">
	import { ScrollArea } from "#lib/components/ui/scroll-area/index.js";
	import { Separator } from "#lib/components/ui/separator/index.js";

	const files = Array.from({ length: 30 }, (_, i) => ({
		id: i + 1,
		name: ["Notes", "Roadmap", "Report", "Brief", "Draft"][i % 5],
		size: ((i * 37) % 120) + 8,
	}));
</script>

<ScrollArea class="h-72 rounded-md border">
	<div class="p-4">
		<h4 class="mb-4 text-sm font-medium">Files</h4>
		{#each files as file (file.id)}
			<div class="flex justify-between text-sm">
				<span>{file.name}</span>
				<span class="text-muted-foreground">{file.size} KB</span>
			</div>
			<Separator class="my-2" />
		{/each}
	</div>
</ScrollArea>
