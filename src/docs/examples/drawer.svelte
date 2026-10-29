<script lang="ts">
	import { toast } from "svelte-sonner";

	import { Button } from "#lib/components/ui/button/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";

	const members = [
		{ name: "Alex", role: "Owner" },
		{ name: "Sam", role: "Editor" },
		{ name: "Jordan", role: "Viewer" },
	];

	let open = $state(false);

	function save() {
		open = false;
		toast.success("Access updated.");
	}
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Manage access</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Manage access</Drawer.Title>
			<Drawer.Description>Website redesign · 3 members</Drawer.Description>
		</Drawer.Header>
		<ul class="divide-y px-4">
			{#each members as member (member.name)}
				<li class="flex justify-between py-3">
					<span>{member.name}</span>
					<span class="text-muted-foreground">{member.role}</span>
				</li>
			{/each}
		</ul>
		<Drawer.Footer>
			<Button onclick={save}>Save</Button>
			<Drawer.Close>
				{#snippet child({ props })}
					<Button {...props} variant="outline">Cancel</Button>
				{/snippet}
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
