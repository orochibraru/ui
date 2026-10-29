<script lang="ts">
	import { toast } from "svelte-sonner";

	import ThemePicker from "#lib/components/blocks/theme-picker.svelte";
</script>

<ThemePicker onchange={(theme) => toast(`Theme: ${theme}.`)} />
