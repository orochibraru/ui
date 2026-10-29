<script lang="ts">
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Card from "#lib/components/ui/card/index.js";
</script>

<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
	<Card.Root>
		<Card.Header>
			<Card.Title>Lisbon trip</Card.Title>
			<Card.Description>4 members · 48 expenses</Card.Description>
			<Card.Action>
				<Button variant="ghost" size="icon-sm" aria-label="More">
					<EllipsisIcon />
				</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<p class="text-2xl font-semibold tabular-nums">1 284,50 €</p>
			<p class="text-muted-foreground">You are owed 312,00 €</p>
		</Card.Content>
		<Card.Footer class="gap-2">
			<Button variant="outline">Settle up</Button>
			<Button>Add expense</Button>
		</Card.Footer>
	</Card.Root>
	<Card.Root size="sm">
		<Card.Header>
			<Card.Title>api-gateway</Card.Title>
			<Card.Description>Deployed 12 minutes ago</Card.Description>
		</Card.Header>
		<Card.Content class="text-muted-foreground">
			Running 3 replicas on node-eu-1.
		</Card.Content>
	</Card.Root>
</div>
