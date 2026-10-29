<script lang="ts">
	import ResponsiveSheet from "#lib/components/blocks/responsive-sheet.svelte";
	import { Button } from "#lib/components/ui/button/index.js";

	let open = $state(false);
</script>

<div>
	<Button variant="outline" onclick={() => (open = true)}>Edit profile</Button>
</div>
<ResponsiveSheet
	bind:open
	title="Edit profile"
	description="A dialog on desktop, a drawer on phones."
>
	<p class="pb-6 text-sm">Resize the window to see it switch.</p>
</ResponsiveSheet>
