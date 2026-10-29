<script lang="ts">
	import HouseIcon from "@lucide/svelte/icons/house";
	import UserRoundIcon from "@lucide/svelte/icons/user-round";
	import UsersIcon from "@lucide/svelte/icons/users";

	import BottomNav from "#lib/components/blocks/bottom-nav.svelte";

	const { children } = $props();

	const items = [
		{ href: "/", label: "Home", icon: HouseIcon },
		{ href: "/groups", label: "Groups", icon: UsersIcon },
		{ href: "/account", label: "Account", icon: UserRoundIcon },
	];
</script>

<main class="min-h-dvh pb-32 md:pb-10">
	{@render children()}
</main>
<BottomNav {items} />
