<script lang="ts">
	import "./layout.css";

	import { ModeWatcher } from "mode-watcher";

	import DocumentTitle from "#lib/components/blocks/document-title.svelte";
	import TopLoadingBar from "#lib/components/blocks/top-loading-bar.svelte";
	import { Toaster } from "#lib/components/ui/sonner/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";
	import { providePageTitle } from "#lib/page-title.svelte.js";

	const { children } = $props();

	providePageTitle();
</script>

<ModeWatcher />
<DocumentTitle appName="@orochibraru/ui" />
<TopLoadingBar />
<Toaster />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
