<script lang="ts">
	import BellIcon from "@lucide/svelte/icons/bell";
	import FingerprintIcon from "@lucide/svelte/icons/fingerprint";
	import UserRoundIcon from "@lucide/svelte/icons/user-round";

	import NavCards, {
		type SectionTab,
	} from "#lib/components/blocks/nav-cards.svelte";

	const tabs: SectionTab[] = [
		{
			href: "#profile",
			label: "Profile",
			description: "Your name and the email you sign in with.",
			icon: UserRoundIcon,
		},
		{
			href: "#security",
			label: "Security",
			description: "Password, passkeys and backup codes.",
			icon: FingerprintIcon,
		},
		{
			href: "#notifications",
			label: "Notifications",
			description: "Get told on this device when something happens.",
			icon: BellIcon,
		},
	];
</script>

<p class="text-muted-foreground hidden text-sm md:block">
	Phones only: narrow the window to see the cards. On desktop the section shows
	its tabs instead.
</p>
<NavCards {tabs} />
