<script lang="ts">
	import CopyIcon from "@lucide/svelte/icons/copy";
	import SearchIcon from "@lucide/svelte/icons/search";

	import * as InputGroup from "#lib/components/ui/input-group/index.js";
</script>

<div class="grid gap-4 md:grid-cols-3">
	<InputGroup.Root>
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Input placeholder="Search expenses" />
	</InputGroup.Root>
	<InputGroup.Root>
		<InputGroup.Input type="number" placeholder="0.00" />
		<InputGroup.Addon align="inline-end">
			<InputGroup.Text>EUR</InputGroup.Text>
		</InputGroup.Addon>
	</InputGroup.Root>
	<InputGroup.Root>
		<InputGroup.Input readonly value="https://homerun.dev/s/api" />
		<InputGroup.Addon align="inline-end">
			<InputGroup.Button size="icon-xs" aria-label="Copy URL">
				<CopyIcon />
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
</div>
