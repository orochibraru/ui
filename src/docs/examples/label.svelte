<script lang="ts">
	import { Checkbox } from "#lib/components/ui/checkbox/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { Label } from "#lib/components/ui/label/index.js";
</script>

<div class="flex flex-wrap items-end gap-6">
	<div class="flex flex-col gap-2">
		<Label for="project-name">Project name</Label>
		<Input id="project-name" placeholder="Marketing site" />
	</div>
	<div class="flex h-9 items-center gap-2">
		<Checkbox id="project-notify" />
		<Label for="project-notify">Notify team members</Label>
	</div>
</div>
