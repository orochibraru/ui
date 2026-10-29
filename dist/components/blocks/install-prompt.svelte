<script lang="ts">
	import DownloadIcon from "@lucide/svelte/icons/download";
	import EllipsisVerticalIcon from "@lucide/svelte/icons/ellipsis-vertical";
	import ShareIcon from "@lucide/svelte/icons/share";
	import SquarePlusIcon from "@lucide/svelte/icons/square-plus";
	import { onMount, type Snippet } from "svelte";

	import ResponsiveSheet from "./responsive-sheet.svelte";
	import { Button } from "../ui/button/index.js";

	interface InstallPromptEvent extends Event {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
	}

	const defaultMessages = {
		description:
			"Open it from your home screen like any app: full screen, quicker to reach, and with notifications.",
		appleShare: "Tap Share in your browser's toolbar or address bar.",
		appleAdd: "Pick Add to Home Screen, then Add.",
		menuOpen: "Open your browser's menu.",
		menuInstall: "Pick Install app or Add to Home screen.",
		gotIt: "Got it",
		install: "Install",
		notNow: "Not now",
	};

	interface Props {
		appName: string;
		storageKey: string;
		brand?: Snippet;
		title?: string;
		messages?: Partial<typeof defaultMessages>;
	}

	const {
		appName,
		storageKey,
		brand,
		title = `Install ${appName}`,
		messages = {},
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });

	let open = $state(false);
	let mode = $state<"native" | "apple" | "menu">("native");
	let deferred: InstallPromptEvent | undefined;

	function alreadyPrompted(): boolean {
		try {
			return localStorage.getItem(storageKey) !== null;
		} catch {
			return true;
		}
	}

	function show(next: "native" | "apple" | "menu") {
		if (alreadyPrompted()) {
			return;
		}
		mode = next;
		open = true;
		try {
			localStorage.setItem(storageKey, new Date().toISOString());
		} catch {
			open = false;
		}
	}

	onMount(() => {
		const standalone =
			matchMedia("(display-mode: standalone)").matches ||
			("standalone" in navigator && navigator.standalone === true);
		const touch = matchMedia("(pointer: coarse)").matches;
		if (standalone || !touch || alreadyPrompted()) {
			return;
		}
		const apple =
			/iPhone|iPad/.test(navigator.userAgent) ||
			(/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
		if (apple) {
			const timer = setTimeout(() => show("apple"), 1500);
			return () => clearTimeout(timer);
		}
		const capture = (event: Event) => {
			event.preventDefault();
			deferred = event as InstallPromptEvent;
			if (open) {
				mode = "native";
			} else {
				show("native");
			}
		};
		addEventListener("beforeinstallprompt", capture);
		const fallback = setTimeout(() => {
			if (!deferred) {
				show("menu");
			}
		}, 4000);
		return () => {
			removeEventListener("beforeinstallprompt", capture);
			clearTimeout(fallback);
		};
	});

	async function install() {
		open = false;
		await deferred?.prompt();
		deferred = undefined;
	}
</script>

{#snippet step(Icon: typeof ShareIcon, label: string)}
	<li class="flex items-center gap-3">
		<span
			class="bg-accent text-accent-foreground flex size-9 shrink-0 items-center justify-center rounded-xl"
			><Icon class="size-4" /></span
		>
		{label}
	</li>
{/snippet}

<ResponsiveSheet bind:open {title} description={text.description}>
	<div class="flex flex-col gap-5 pb-4">
		{#if brand}
			<div class="flex justify-center py-2">
				{@render brand()}
			</div>
		{/if}
		{#if mode === "native"}
			<Button class="glow h-12 rounded-xl text-base" onclick={install}>
				<DownloadIcon />
				{text.install}
			</Button>
			<Button
				variant="ghost"
				class="h-11 rounded-xl"
				onclick={() => (open = false)}>{text.notNow}</Button
			>
		{:else}
			<ol class="flex flex-col gap-3 text-sm">
				{#if mode === "apple"}
					{@render step(ShareIcon, text.appleShare)}
					{@render step(SquarePlusIcon, text.appleAdd)}
				{:else}
					{@render step(EllipsisVerticalIcon, text.menuOpen)}
					{@render step(SquarePlusIcon, text.menuInstall)}
				{/if}
			</ol>
			<Button class="h-12 rounded-xl text-base" onclick={() => (open = false)}
				>{text.gotIt}</Button
			>
		{/if}
	</div>
</ResponsiveSheet>
