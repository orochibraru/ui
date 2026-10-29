<script lang="ts">
	import type { Component } from "svelte";

	import * as Tooltip from "#lib/components/ui/tooltip/index.js";

	const {
		component: Inner,
		innerProps = {},
	}: {
		component: Component<Record<string, unknown>>;
		innerProps?: Record<string, unknown>;
	} = $props();
</script>

<Tooltip.Provider>
	<Inner {...innerProps} />
</Tooltip.Provider>
