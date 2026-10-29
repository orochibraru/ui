<script lang="ts">
	import HouseIcon from "@lucide/svelte/icons/house";
	import ReceiptIcon from "@lucide/svelte/icons/receipt";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UsersIcon from "@lucide/svelte/icons/users";
	import WalletIcon from "@lucide/svelte/icons/wallet";

	import * as Sidebar from "#lib/components/ui/sidebar/index.js";

	const items = [
		{ title: "Overview", href: "#overview", icon: HouseIcon },
		{ title: "Expenses", href: "#expenses", icon: ReceiptIcon, badge: 23 },
		{ title: "Members", href: "#members", icon: UsersIcon },
		{ title: "Settings", href: "#settings", icon: SettingsIcon },
	];

	let active = $state("Expenses");
</script>

<Sidebar.Provider class="h-96 min-h-0 overflow-hidden rounded-lg border">
	<Sidebar.Root collapsible="none" class="border-e">
		<Sidebar.Header>
			<div class="flex items-center gap-2 p-2 font-semibold">
				<WalletIcon class="size-4" /> OpenCount
			</div>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Weekend in Lyon</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={active === item.title}>
									{#snippet child({ props })}
										<a
											href={item.href}
											{...props}
											onclick={() => (active = item.title)}
										>
											<item.icon />
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
								{#if item.badge}
									<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
								{/if}
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer>
			<div class="p-2 text-sm text-muted-foreground">alex@example.com</div>
		</Sidebar.Footer>
	</Sidebar.Root>
	<div class="flex-1 p-6">
		<h3 class="font-semibold">{active}</h3>
		<p class="text-sm text-muted-foreground">Page content goes here.</p>
	</div>
</Sidebar.Provider>
