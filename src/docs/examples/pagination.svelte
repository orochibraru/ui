<script lang="ts">
	import * as Pagination from "#lib/components/ui/pagination/index.js";

	let page = $state(1);
</script>

<Pagination.Root count={240} perPage={20} bind:page>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.Previous />
			</Pagination.Item>
			{#each pages as p (p.key)}
				<Pagination.Item>
					{#if p.type === "ellipsis"}
						<Pagination.Ellipsis />
					{:else}
						<Pagination.Link page={p} isActive={currentPage === p.value} />
					{/if}
				</Pagination.Item>
			{/each}
			<Pagination.Item>
				<Pagination.Next />
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>
