<script lang="ts">
	import PlusIcon from "@lucide/svelte/icons/plus";
	import { toast } from "svelte-sonner";

	import Fab from "#lib/components/blocks/fab.svelte";
</script>

<p class="text-muted-foreground text-sm">
	Phones only: narrow the window and it floats bottom right, above the tab bar.
	On desktop the same action is a primary button in the page header.
</p>
<Fab label="Add expense" icon={PlusIcon} onclick={() => toast("Fab tapped.")} />
