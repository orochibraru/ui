<script lang="ts">
	import "./layout.css";

	import { ModeWatcher } from "mode-watcher";

	import BottomNav from "#lib/components/blocks/bottom-nav.svelte";
	import DocumentTitle from "#lib/components/blocks/document-title.svelte";
	import TopLoadingBar from "#lib/components/blocks/top-loading-bar.svelte";
	import { Toaster } from "#lib/components/ui/sonner/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";
	import { providePageTitle } from "#lib/page-title.svelte.js";

	import AppBar from "../docs/app-bar.svelte";
	import PageHeader from "../docs/page-header.svelte";
	import { sections } from "../docs/registry.js";
	import Sidebar from "../docs/sidebar.svelte";

	const { children } = $props();

	providePageTitle();
</script>

<ModeWatcher />
<DocumentTitle appName="@orochibraru/ui" />
<TopLoadingBar />
<Toaster />
<Tooltip.Provider>
	<Sidebar />
	<AppBar />
	<main
		class="min-h-dvh px-[max(1rem,env(safe-area-inset-left))] pt-[calc(env(safe-area-inset-top)+4.25rem)] pb-32 md:pt-8 md:pr-8 md:pb-10 md:pl-80 xl:pr-10"
	>
		<PageHeader />
		{@render children()}
	</main>
	<BottomNav items={sections} />
</Tooltip.Provider>
