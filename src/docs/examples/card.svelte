<script lang="ts">
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Card from "#lib/components/ui/card/index.js";
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
	<Card.Root>
		<Card.Header>
			<Card.Title>Website redesign</Card.Title>
			<Card.Description>4 members · 48 files</Card.Description>
			<Card.Action>
				<Button variant="ghost" size="icon-sm" aria-label="More">
					<EllipsisIcon />
				</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<p class="text-2xl font-semibold tabular-nums">12 of 20 tasks</p>
			<p class="text-muted-foreground">Due in 5 days</p>
		</Card.Content>
		<Card.Footer class="gap-2">
			<Button variant="outline">Share</Button>
			<Button>New task</Button>
		</Card.Footer>
	</Card.Root>
	<Card.Root size="sm">
		<Card.Header>
			<Card.Title>Quarterly report</Card.Title>
			<Card.Description>Edited 12 minutes ago</Card.Description>
		</Card.Header>
		<Card.Content class="text-muted-foreground">
			Shared with 3 team members.
		</Card.Content>
	</Card.Root>
</div>
