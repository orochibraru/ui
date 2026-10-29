<script lang="ts">
	import { resolve } from "$app/paths";
	import { untrack } from "svelte";

	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";

	import type { Group } from "./catalog.js";

	const {
		group,
		slug,
		landscape = false,
	}: { group: Group; slug: string; landscape?: boolean } = $props();

	const devices = {
		iphone: { label: "iPhone", width: 393, height: 852, bezel: 24 },
		android: { label: "Android", width: 412, height: 915, bezel: 20 },
	};

	type Device = keyof typeof devices;
	type Orientation = "portrait" | "landscape";

	let device = $state<Device>("iphone");
	let orientation = $state<Orientation>(
		untrack(() => landscape) ? "landscape" : "portrait",
	);
	let available = $state(0);

	const phone = $derived(devices[device]);
	const rotated = $derived(orientation === "landscape");
	const screenWidth = $derived(rotated ? phone.height : phone.width);
	const screenHeight = $derived(rotated ? phone.width : phone.height);
	const scale = $derived(
		available > 0
			? Math.min(0.72, (available - phone.bezel) / screenWidth)
			: 0.72,
	);
	const livePages: Record<string, string> = {
		"blocks/tab-section": resolve("/section"),
	};
	const src = $derived(
		`${livePages[`${group}/${slug}`] ?? resolve("/preview/[group]/[slug]", { group, slug })}?device=${device}&orientation=${orientation}`,
	);
</script>

<figure
	class="flex w-full flex-col items-center gap-4"
	bind:clientWidth={available}
>
	<div class="flex flex-wrap justify-center gap-2">
		<ToggleGroup.Root
			type="single"
			variant="outline"
			size="sm"
			aria-label="Device"
			bind:value={() => device, (next) => next && (device = next as Device)}
		>
			{#each Object.entries(devices) as [value, { label }] (value)}
				<ToggleGroup.Item {value} class="px-3">{label}</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>
		<ToggleGroup.Root
			type="single"
			variant="outline"
			size="sm"
			aria-label="Orientation"
			bind:value={
				() => orientation, (next) => next && (orientation = next as Orientation)
			}
		>
			<ToggleGroup.Item value="portrait" class="px-3">Portrait</ToggleGroup.Item
			>
			<ToggleGroup.Item value="landscape" class="px-3"
				>Landscape</ToggleGroup.Item
			>
		</ToggleGroup.Root>
	</div>

	<div
		class="relative shrink-0 bg-neutral-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/15 {device ===
		'iphone'
			? 'rounded-[3.4rem] p-3'
			: 'rounded-[2.6rem] p-2.5'}"
		style:width="{screenWidth * scale + phone.bezel}px"
	>
		{#if rotated}
			{#if device === "iphone"}
				<span
					class="absolute -bottom-1 left-28 h-1 w-10 rounded-b bg-neutral-800"
					aria-hidden="true"
				></span>
				<span
					class="absolute -bottom-1 left-40 h-1 w-10 rounded-b bg-neutral-800"
					aria-hidden="true"
				></span>
				<span
					class="absolute -top-1 left-36 h-1 w-16 rounded-t bg-neutral-800"
					aria-hidden="true"
				></span>
			{:else}
				<span
					class="absolute -top-1 left-24 h-1 w-12 rounded-t bg-neutral-800"
					aria-hidden="true"
				></span>
				<span
					class="absolute -top-1 left-40 h-1 w-20 rounded-t bg-neutral-800"
					aria-hidden="true"
				></span>
			{/if}
		{:else if device === "iphone"}
			<span
				class="absolute top-28 -left-1 h-10 w-1 rounded-l bg-neutral-800"
				aria-hidden="true"
			></span>
			<span
				class="absolute top-40 -left-1 h-10 w-1 rounded-l bg-neutral-800"
				aria-hidden="true"
			></span>
			<span
				class="absolute top-36 -right-1 h-16 w-1 rounded-r bg-neutral-800"
				aria-hidden="true"
			></span>
		{:else}
			<span
				class="absolute top-24 -right-1 h-12 w-1 rounded-r bg-neutral-800"
				aria-hidden="true"
			></span>
			<span
				class="absolute top-40 -right-1 h-20 w-1 rounded-r bg-neutral-800"
				aria-hidden="true"
			></span>
		{/if}
		<div
			class="bg-background relative overflow-hidden {device === 'iphone'
				? 'rounded-[2.6rem]'
				: 'rounded-4xl'}"
			style:width="{screenWidth * scale}px"
			style:height="{screenHeight * scale}px"
		>
			{#key `${device}-${orientation}`}
				<iframe
					title="{phone.label} preview"
					{src}
					class="origin-top-left border-0"
					style:width="{screenWidth}px"
					style:height="{screenHeight}px"
					style:transform="scale({scale})"
				></iframe>
			{/key}
			{#if device === "iphone"}
				<span
					class="pointer-events-none absolute rounded-full bg-black {rotated
						? 'top-1/2 left-2 h-[30%] w-6 -translate-y-1/2'
						: 'top-2 left-1/2 h-6 w-[30%] -translate-x-1/2'}"
					aria-hidden="true"
				></span>
				<span
					class="bg-foreground/70 pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-[35%] -translate-x-1/2 rounded-full"
					aria-hidden="true"
				></span>
			{:else}
				<span
					class="pointer-events-none absolute size-3 rounded-full bg-black {rotated
						? 'top-1/2 left-2.5 -translate-y-1/2'
						: 'top-2.5 left-1/2 -translate-x-1/2'}"
					aria-hidden="true"
				></span>
				<span
					class="bg-foreground/50 pointer-events-none absolute bottom-1.5 left-1/2 h-0.5 w-[28%] -translate-x-1/2 rounded-full"
					aria-hidden="true"
				></span>
			{/if}
		</div>
	</div>
	<figcaption class="text-muted-foreground text-xs">
		{phone.label} · {screenWidth}×{screenHeight}
	</figcaption>
</figure>
