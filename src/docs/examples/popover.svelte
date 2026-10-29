<script lang="ts">
	import { buttonVariants } from "#lib/components/ui/button/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { Label } from "#lib/components/ui/label/index.js";
	import * as Popover from "#lib/components/ui/popover/index.js";
</script>

<Popover.Root>
	<Popover.Trigger class={buttonVariants({ variant: "outline" })}>
		Set budget
	</Popover.Trigger>
	<Popover.Content>
		<Popover.Header>
			<Popover.Title>Monthly budget</Popover.Title>
			<Popover.Description>
				We'll warn the group when spending gets close.
			</Popover.Description>
		</Popover.Header>
		<div class="flex flex-col gap-2">
			<Label for="budget-amount">Amount (EUR)</Label>
			<Input id="budget-amount" type="number" value="800" />
		</div>
	</Popover.Content>
</Popover.Root>
