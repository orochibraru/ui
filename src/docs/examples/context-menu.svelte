<script lang="ts">
	import CopyIcon from "@lucide/svelte/icons/copy";
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	import * as ContextMenu from "#lib/components/ui/context-menu/index.js";

	let showArchived = $state(false);
	let sort = $state("date");
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="text-muted-foreground flex h-36 w-full items-center justify-center rounded-lg border border-dashed text-sm"
	>
		Right-click (or long-press) the file list
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-56">
		<ContextMenu.Item>
			<PencilIcon /> Edit
			<ContextMenu.Shortcut>⌘E</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item><CopyIcon /> Duplicate</ContextMenu.Item>
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger>Move to project</ContextMenu.SubTrigger>
			<ContextMenu.SubContent>
				<ContextMenu.Item>Website redesign</ContextMenu.Item>
				<ContextMenu.Item>Mobile app</ContextMenu.Item>
			</ContextMenu.SubContent>
		</ContextMenu.Sub>
		<ContextMenu.Separator />
		<ContextMenu.CheckboxItem bind:checked={showArchived}>
			Show archived
		</ContextMenu.CheckboxItem>
		<ContextMenu.Separator />
		<ContextMenu.Group>
			<ContextMenu.GroupHeading>Sort by</ContextMenu.GroupHeading>
			<ContextMenu.RadioGroup bind:value={sort}>
				<ContextMenu.RadioItem value="date">Date</ContextMenu.RadioItem>
				<ContextMenu.RadioItem value="name">Name</ContextMenu.RadioItem>
			</ContextMenu.RadioGroup>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.Item variant="destructive"
			><Trash2Icon /> Delete</ContextMenu.Item
		>
	</ContextMenu.Content>
</ContextMenu.Root>
