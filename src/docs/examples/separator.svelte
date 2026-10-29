<script lang="ts">
	import { Separator } from "#lib/components/ui/separator/index.js";
</script>

<div class="grid gap-4">
	<div class="grid gap-1">
		<h4 class="text-sm font-medium">Weekend in Lyon</h4>
		<p class="text-sm text-muted-foreground">4 members, 23 expenses</p>
	</div>
	<Separator />
	<div class="flex h-5 items-center gap-4 text-sm">
		<a href="#expenses">Expenses</a>
		<Separator orientation="vertical" />
		<a href="#balances">Balances</a>
		<Separator orientation="vertical" />
		<a href="#settings">Settings</a>
	</div>
</div>
