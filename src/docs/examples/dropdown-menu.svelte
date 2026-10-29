<script lang="ts">
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";

	let autoDeploy = $state(true);
	let channel = $state("stable");
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">
				api-gateway <EllipsisIcon />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="start">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Service</DropdownMenu.Label>
			<DropdownMenu.Item>
				<PencilIcon /> Edit
				<DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item><RotateCwIcon /> Restart</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.CheckboxItem bind:checked={autoDeploy}>
			Deploy on push
		</DropdownMenu.CheckboxItem>
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger>Release channel</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				<DropdownMenu.RadioGroup bind:value={channel}>
					<DropdownMenu.RadioItem value="stable">Stable</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="canary">Canary</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
		<DropdownMenu.Separator />
		<DropdownMenu.Item variant="destructive">
			<Trash2Icon /> Delete
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
