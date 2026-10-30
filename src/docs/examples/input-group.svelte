<script lang="ts">
	import CopyIcon from "@lucide/svelte/icons/copy";
	import SearchIcon from "@lucide/svelte/icons/search";

	import * as InputGroup from "#lib/components/ui/input-group/index.js";
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
	<InputGroup.Root>
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Input placeholder="Search files" />
	</InputGroup.Root>
	<InputGroup.Root>
		<InputGroup.Input type="number" placeholder="25" />
		<InputGroup.Addon align="inline-end">
			<InputGroup.Text>MB</InputGroup.Text>
		</InputGroup.Addon>
	</InputGroup.Root>
	<InputGroup.Root>
		<InputGroup.Input readonly value="https://acme.com/s/report" />
		<InputGroup.Addon align="inline-end">
			<InputGroup.Button size="icon-xs" aria-label="Copy URL">
				<CopyIcon />
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
</div>
