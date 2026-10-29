<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";

	import { Badge } from "#lib/components/ui/badge/index.js";
</script>

<div class="flex flex-wrap items-center gap-2">
	<Badge>Active</Badge>
	<Badge variant="secondary">Pending</Badge>
	<Badge variant="outline">Archived</Badge>
	<Badge variant="destructive">Overdue</Badge>
	<Badge variant="secondary"
		><CheckIcon data-icon="inline-start" /> Completed</Badge
	>
	<Badge href="#">3 new messages</Badge>
</div>
