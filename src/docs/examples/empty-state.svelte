<script lang="ts">
	import InboxIcon from "@lucide/svelte/icons/inbox";
	import PlusIcon from "@lucide/svelte/icons/plus";

	import EmptyState from "#lib/components/blocks/empty-state.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
</script>

<EmptyState
	icon={InboxIcon}
	title="No expenses yet"
	subtitle="Add the first one and it shows up here."
>
	<Button><PlusIcon /> Add expense</Button>
</EmptyState>
