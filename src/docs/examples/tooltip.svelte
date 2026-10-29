<script lang="ts">
	import DownloadIcon from "@lucide/svelte/icons/download";
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";
</script>

<div class="flex flex-wrap items-center gap-2">
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="icon" aria-label="Edit">
					<PencilIcon />
				</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>Edit expense</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="icon" aria-label="Export">
					<DownloadIcon />
				</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content side="bottom">Export as CSV</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="icon" aria-label="Delete">
					<Trash2Icon />
				</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Delete for everyone</Tooltip.Content>
	</Tooltip.Root>
</div>
