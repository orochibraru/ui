import { resolve } from "$app/paths";
import PaletteIcon from "@lucide/svelte/icons/palette";
import UserRoundIcon from "@lucide/svelte/icons/user-round";

import type { SectionTab } from "#lib/components/blocks/nav-cards.svelte";

export const tabs: SectionTab[] = [
	{
		href: resolve("/section/profile"),
		label: "Profile",
		description: "Your name and the email you sign in with.",
		icon: UserRoundIcon,
	},
	{
		href: resolve("/section/appearance"),
		label: "Appearance",
		description: "Light, dark, or whatever the device says.",
		icon: PaletteIcon,
	},
];
