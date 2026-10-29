<script lang="ts">
	import InboxIcon from "@lucide/svelte/icons/inbox";
	import PlusIcon from "@lucide/svelte/icons/plus";

	import EmptyState from "#lib/components/blocks/empty-state.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
</script>

<EmptyState
	icon={InboxIcon}
	title="No messages yet"
	subtitle="Start a conversation and it shows up here."
>
	<Button><PlusIcon /> New message</Button>
</EmptyState>
