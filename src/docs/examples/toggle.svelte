<script lang="ts">
	import BellIcon from "@lucide/svelte/icons/bell";
	import StarIcon from "@lucide/svelte/icons/star";

	import { Toggle } from "#lib/components/ui/toggle/index.js";

	let starred = $state(false);
</script>

<div class="flex flex-wrap items-center gap-2">
	<Toggle bind:pressed={starred} aria-label="Star this group">
		<StarIcon class={starred ? "fill-current" : ""} />
	</Toggle>
	<Toggle variant="outline" aria-label="Mute notifications">
		<BellIcon /> Mute
	</Toggle>
	<Toggle size="sm" variant="outline">Recurring only</Toggle>
	<Toggle size="lg" pressed>Unpaid</Toggle>
	<Toggle disabled>Archived</Toggle>
</div>
