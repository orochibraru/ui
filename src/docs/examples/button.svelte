<script lang="ts">
	import PlusIcon from "@lucide/svelte/icons/plus";

	import { Button } from "#lib/components/ui/button/index.js";
</script>

<div class="flex flex-wrap items-center gap-2">
	<Button>Primary</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="outline">Outline</Button>
	<Button variant="ghost">Ghost</Button>
	<Button variant="destructive">Delete</Button>
	<Button variant="link">Link</Button>
	<Button loading>Saving</Button>
	<Button size="icon" aria-label="Add"><PlusIcon /></Button>
	<Button href="/">As a link</Button>
</div>
