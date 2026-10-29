<script lang="ts">
	import { Input } from "#lib/components/ui/input/index.js";
	import { Label } from "#lib/components/ui/label/index.js";
</script>

<div class="grid gap-4 md:grid-cols-2">
	<div class="flex flex-col gap-2">
		<Label for="account-email">Email</Label>
		<Input
			id="account-email"
			type="email"
			autocomplete="email"
			placeholder="you@example.com"
		/>
	</div>
	<div class="flex flex-col gap-2">
		<Label for="service-search">Search services</Label>
		<Input id="service-search" type="search" placeholder="postgres, redis…" />
	</div>
</div>
