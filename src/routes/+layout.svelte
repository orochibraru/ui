<script lang="ts">
	import "./layout.css";

	import { page } from "$app/state";
	import { ModeWatcher } from "mode-watcher";
	import { onMount } from "svelte";

	import BottomNav from "#lib/components/blocks/bottom-nav.svelte";
	import DocumentTitle from "#lib/components/blocks/document-title.svelte";
	import TopLoadingBar from "#lib/components/blocks/top-loading-bar.svelte";
	import { Toaster } from "#lib/components/ui/sonner/index.js";
	import * as Tooltip from "#lib/components/ui/tooltip/index.js";
	import { providePageTitle } from "#lib/page-title.svelte.js";

	import AppBar from "../docs/app-bar.svelte";
	import DocsSearch from "../docs/docs-search.svelte";
	import PageHeader from "../docs/page-header.svelte";
	import { sections } from "../docs/registry.js";
	import Sidebar from "../docs/sidebar.svelte";

	const { children } = $props();

	providePageTitle();

	let searchOpen = $state(false);

	const deviceInsets = {
		iphone: {
			portrait: { top: "59px", right: "0px", bottom: "34px", left: "0px" },
			landscape: { top: "0px", right: "59px", bottom: "21px", left: "59px" },
		},
		android: {
			portrait: { top: "32px", right: "0px", bottom: "20px", left: "0px" },
			landscape: { top: "0px", right: "0px", bottom: "20px", left: "32px" },
		},
	};

	onMount(() => {
		const device = page.url.searchParams.get("device");
		if (
			window.self === window.top ||
			!(device === "iphone" || device === "android")
		) {
			return;
		}
		const orientation =
			page.url.searchParams.get("orientation") === "landscape"
				? "landscape"
				: "portrait";
		for (const [side, inset] of Object.entries(
			deviceInsets[device][orientation],
		)) {
			document.documentElement.style.setProperty(
				`--emulated-safe-${side}`,
				inset,
			);
		}
	});
</script>

<ModeWatcher />
<DocumentTitle appName="@orochibraru/ui" />
<TopLoadingBar />
<Toaster />
<Tooltip.Provider>
	{#if page.route.id?.startsWith("/preview/")}
		{@render children()}
	{:else}
		<a
			href="#main-content"
			class="bg-background text-foreground focus-visible:ring-ring fixed top-2 left-2 z-50 -translate-y-20 rounded-md px-4 py-2 font-medium shadow-lg outline-none transition-transform focus:translate-y-0 focus-visible:ring-3"
		>
			Skip to main content
		</a>
		<Sidebar onsearch={() => (searchOpen = true)} />
		<AppBar onsearch={() => (searchOpen = true)} />
		<main
			id="main-content"
			tabindex="-1"
			class="min-h-dvh px-[max(1rem,var(--safe-left))] pt-[calc(var(--safe-top)+4.25rem)] pb-32 md:pt-8 md:pr-8 md:pb-10 md:pl-80 xl:pr-10 print:p-0"
		>
			<PageHeader />
			{@render children()}
		</main>
		{#if !(page.params.group === "blocks" && page.params.slug === "bottom-nav")}
			<BottomNav items={sections} />
		{/if}
		<DocsSearch bind:open={searchOpen} />
	{/if}
</Tooltip.Provider>
