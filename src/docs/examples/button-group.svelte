<script lang="ts">
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import CopyIcon from "@lucide/svelte/icons/copy";

	import * as ButtonGroup from "#lib/components/ui/button-group/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
</script>

<div class="flex flex-wrap items-center gap-4">
	<ButtonGroup.Root>
		<Button variant="outline">Day</Button>
		<Button variant="outline">Week</Button>
		<Button variant="outline">Month</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<Button variant="outline" size="icon" aria-label="Previous month">
			<ChevronLeftIcon />
		</Button>
		<ButtonGroup.Text>October 2026</ButtonGroup.Text>
		<Button variant="outline" size="icon" aria-label="Next month">
			<ChevronRightIcon />
		</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<ButtonGroup.Text>https://</ButtonGroup.Text>
		<Input value="api.homerun.dev" aria-label="Domain" />
		<Button variant="outline" size="icon" aria-label="Copy">
			<CopyIcon />
		</Button>
	</ButtonGroup.Root>
</div>
