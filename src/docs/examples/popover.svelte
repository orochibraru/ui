<script lang="ts">
	import { buttonVariants } from "#lib/components/ui/button/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { Label } from "#lib/components/ui/label/index.js";
	import * as Popover from "#lib/components/ui/popover/index.js";
</script>

<Popover.Root>
	<Popover.Trigger class={buttonVariants({ variant: "outline" })}>
		Set storage limit
	</Popover.Trigger>
	<Popover.Content>
		<Popover.Header>
			<Popover.Title>Storage limit</Popover.Title>
			<Popover.Description>
				We'll warn the team when the workspace gets close.
			</Popover.Description>
		</Popover.Header>
		<div class="flex flex-col gap-2">
			<Label for="storage-limit">Limit (GB)</Label>
			<Input id="storage-limit" type="number" value="100" />
		</div>
	</Popover.Content>
</Popover.Root>
