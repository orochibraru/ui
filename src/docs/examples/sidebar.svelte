<script lang="ts">
	import BoxIcon from "@lucide/svelte/icons/box";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import HouseIcon from "@lucide/svelte/icons/house";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UsersIcon from "@lucide/svelte/icons/users";

	import * as Sidebar from "#lib/components/ui/sidebar/index.js";

	const items = [
		{ title: "Overview", href: "#overview", icon: HouseIcon },
		{ title: "Projects", href: "#projects", icon: FolderIcon, badge: 12 },
		{ title: "Members", href: "#members", icon: UsersIcon },
		{ title: "Settings", href: "#settings", icon: SettingsIcon },
	];

	let active = $state("Projects");
</script>

<Sidebar.Provider class="h-96 min-h-0 overflow-hidden rounded-lg border">
	<Sidebar.Root collapsible="none" class="border-e">
		<Sidebar.Header>
			<div class="flex items-center gap-2 p-2 font-semibold">
				<BoxIcon class="size-4" /> Acme
			</div>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
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
