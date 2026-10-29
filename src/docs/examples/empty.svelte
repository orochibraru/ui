<script lang="ts">
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import PlusIcon from "@lucide/svelte/icons/plus";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Empty from "#lib/components/ui/empty/index.js";
</script>

<Empty.Root class="border">
	<Empty.Header>
		<Empty.Media variant="icon">
			<FileTextIcon />
		</Empty.Media>
		<Empty.Title>No documents yet</Empty.Title>
		<Empty.Description>
			Create the first document of this project to get started.
		</Empty.Description>
	</Empty.Header>
	<Empty.Content>
		<Button><PlusIcon /> New document</Button>
	</Empty.Content>
</Empty.Root>
