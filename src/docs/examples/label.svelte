<script lang="ts">
	import { Checkbox } from "#lib/components/ui/checkbox/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { Label } from "#lib/components/ui/label/index.js";
</script>

<div class="flex flex-wrap items-end gap-6">
	<div class="flex flex-col gap-2">
		<Label for="group-name">Group name</Label>
		<Input id="group-name" placeholder="Summer trip" />
	</div>
	<div class="flex h-9 items-center gap-2">
		<Checkbox id="group-notify" />
		<Label for="group-notify">Notify members</Label>
	</div>
</div>
