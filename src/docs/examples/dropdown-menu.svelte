<script lang="ts">
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import Share2Icon from "@lucide/svelte/icons/share-2";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";

	let notify = $state(true);
	let visibility = $state("private");
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">
				Website redesign <EllipsisIcon />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="start">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Project</DropdownMenu.Label>
			<DropdownMenu.Item>
				<PencilIcon /> Edit
				<DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item><Share2Icon /> Share</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.CheckboxItem bind:checked={notify}>
			Notifications
		</DropdownMenu.CheckboxItem>
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger>Visibility</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				<DropdownMenu.RadioGroup bind:value={visibility}>
					<DropdownMenu.RadioItem value="private"
						>Private</DropdownMenu.RadioItem
					>
					<DropdownMenu.RadioItem value="team">Team</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
		<DropdownMenu.Separator />
		<DropdownMenu.Item variant="destructive">
			<Trash2Icon /> Delete
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
