<script lang="ts">
	import MonitorSmartphoneIcon from "@lucide/svelte/icons/monitor-smartphone";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import SunIcon from "@lucide/svelte/icons/sun";
	import { setMode, userPrefersMode } from "mode-watcher";
	import { MediaQuery } from "svelte/reactivity";

	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";

	type Theme = "system" | "light" | "dark";

	const defaultMessages = {
		label: "Theme",
		system: "System",
		light: "Light",
		dark: "Dark",
	};

	interface Props {
		value?: Theme;
		onchange?: (theme: Theme) => void;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		value = $bindable(userPrefersMode.current),
		onchange,
		messages = {},
	}: Props = $props();

	const desktop = new MediaQuery("(min-width: 768px)");
	const text = $derived({ ...defaultMessages, ...messages });
	const themes = $derived([
		{ value: "system", label: text.system, icon: MonitorSmartphoneIcon },
		{ value: "light", label: text.light, icon: SunIcon },
		{ value: "dark", label: text.dark, icon: MoonIcon },
	] as const);

	function pick(next: string) {
		if (!next) {
			return;
		}
		value = next as Theme;
		setMode(value);
		onchange?.(value);
	}
</script>

<ToggleGroup.Root
	type="single"
	variant="outline"
	orientation={desktop.current ? "horizontal" : "vertical"}
	aria-label={text.label}
	class="max-md:w-full"
	bind:value={() => value, pick}
>
	{#each themes as theme (theme.value)}
		<ToggleGroup.Item
			value={theme.value}
			aria-label={theme.label}
			title={theme.label}
			class="max-md:h-12 max-md:w-full max-md:justify-start max-md:gap-3 max-md:px-4 md:size-9"
		>
			<theme.icon class="size-4" />
			<span class="md:hidden">{theme.label}</span>
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
