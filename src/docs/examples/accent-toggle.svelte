<script lang="ts">
	import { toast } from "svelte-sonner";

	import AccentToggle from "#lib/components/blocks/accent-toggle.svelte";
</script>

<AccentToggle onchange={(accent) => toast(`Accent: ${accent}.`)} />
