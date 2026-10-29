<script lang="ts">
	import { page } from "$app/state";
	import BellIcon from "@lucide/svelte/icons/bell";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import HouseIcon from "@lucide/svelte/icons/house";
	import UserRoundIcon from "@lucide/svelte/icons/user-round";

	import BottomNav from "#lib/components/blocks/bottom-nav.svelte";

	const items = [
		{ href: "#home", label: "Home", icon: HouseIcon },
		{ href: "#projects", label: "Projects", icon: FolderIcon },
		{ href: "#inbox", label: "Inbox", icon: BellIcon },
		{ href: "#account", label: "Account", icon: UserRoundIcon },
	];
</script>

<p class="text-muted-foreground text-sm">
	Phones only, fixed to the bottom of the screen: see it in the phone frame, or
	on a phone. Leave about 8rem of bottom padding on the page so the last row
	isn't hidden behind it. Pass <code>isActive</code> when a destination owns more
	than its own href.
</p>
<BottomNav
	{items}
	isActive={(_pathname, href) => href === (page.url.hash || "#home")}
/>
