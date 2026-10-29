<script lang="ts">
	import { Button } from "#lib/components/ui/button/index.js";
	import { Spinner } from "#lib/components/ui/spinner/index.js";
</script>

<div class="flex flex-wrap items-center gap-6">
	<Spinner />
	<Spinner class="size-6" />
	<Spinner class="size-8 text-primary" />
	<div class="flex items-center gap-2 text-sm text-muted-foreground">
		<Spinner /> Syncing accounts
	</div>
	<Button disabled><Spinner /> Importing</Button>
</div>
