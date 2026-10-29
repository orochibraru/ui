<script lang="ts">
	import MonitorSmartphoneIcon from "@lucide/svelte/icons/monitor-smartphone";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import SunIcon from "@lucide/svelte/icons/sun";
	import { setMode, userPrefersMode } from "mode-watcher";

	import OptionGroup from "#lib/components/blocks/option-group.svelte";

	type Theme = "system" | "light" | "dark";

	const defaultMessages = {
		legend: "Theme",
		system: "System",
		systemDescription: "Follows your device: light or dark as it switches.",
		light: "Light",
		lightDescription: "Always light, whatever the device says.",
		dark: "Dark",
		darkDescription: "Always dark, easier on the eyes at night.",
	};

	interface Props {
		value?: Theme;
		name?: string;
		onchange?: (theme: Theme) => void;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		value = $bindable(userPrefersMode.current),
		name = "theme",
		onchange,
		messages = {},
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
	const themes = $derived([
		{
			value: "system",
			label: text.system,
			description: text.systemDescription,
			icon: MonitorSmartphoneIcon,
		},
		{
			value: "light",
			label: text.light,
			description: text.lightDescription,
			icon: SunIcon,
		},
		{
			value: "dark",
			label: text.dark,
			description: text.darkDescription,
			icon: MoonIcon,
		},
	]);

	function change() {
		setMode(value);
		onchange?.(value);
	}
</script>

<OptionGroup
	{name}
	legend={text.legend}
	options={themes}
	bind:value
	onchange={change}
/>
