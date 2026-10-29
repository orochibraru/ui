<script lang="ts">
	import FingerprintIcon from "@lucide/svelte/icons/fingerprint";
	import PaletteIcon from "@lucide/svelte/icons/palette";
	import UserRoundIcon from "@lucide/svelte/icons/user-round";

	import TabNav from "#lib/components/blocks/tab-nav.svelte";

	const tabs = [
		{ href: "/blocks/tab-nav", label: "Profile", icon: UserRoundIcon },
		{ href: "/account/appearance", label: "Appearance", icon: PaletteIcon },
		{ href: "/account/security", label: "Security", icon: FingerprintIcon },
	];
</script>

<TabNav {tabs} />
