<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	import { markInsideDrawer } from "./inside.js";
	import { pinPage } from "./pin.js";

	let {
		shouldScaleBackground = true,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		...restProps
	}: DrawerPrimitive.RootProps = $props();

	markInsideDrawer();

	$effect(() => {
		if (open) {
			return pinPage();
		}
	});
</script>

<DrawerPrimitive.Root
	{shouldScaleBackground}
	bind:open
	bind:activeSnapPoint
	{...restProps}
/>
