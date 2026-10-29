<script lang="ts">
	import Pagination from "#lib/components/kit/pagination.svelte";

	let page = $state(1);
	const files = Array.from({ length: 236 }, (_, index) => `File ${index + 1}`);
	const perPage = 20;
	const visible = $derived(files.slice((page - 1) * perPage, page * perPage));
</script>

<div class="grid gap-4">
	<p class="text-muted-foreground text-sm">
		{visible[0]} to {visible.at(-1)}
	</p>
	<Pagination bind:page total={files.length} {perPage} />
	<Pagination
		page={3}
		total={95}
		perPage={10}
		href={(target) => `#page-${target}`}
	/>
</div>
