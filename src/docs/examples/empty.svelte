<script lang="ts">
	import PlusIcon from "@lucide/svelte/icons/plus";
	import ReceiptIcon from "@lucide/svelte/icons/receipt";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Empty from "#lib/components/ui/empty/index.js";
</script>

<Empty.Root class="border">
	<Empty.Header>
		<Empty.Media variant="icon">
			<ReceiptIcon />
		</Empty.Media>
		<Empty.Title>No expenses yet</Empty.Title>
		<Empty.Description>
			Add the first expense of this group and we'll start splitting it.
		</Empty.Description>
	</Empty.Header>
	<Empty.Content>
		<Button><PlusIcon /> Add expense</Button>
	</Empty.Content>
</Empty.Root>
