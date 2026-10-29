<script lang="ts">
	import * as Menubar from "#lib/components/ui/menubar/index.js";

	let showArchived = $state(false);
	let sort = $state("name");
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item
				>New file <Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item
			>
			<Menubar.Item
				>Duplicate <Menubar.Shortcut>⌘D</Menubar.Shortcut></Menubar.Item
			>
			<Menubar.Sub>
				<Menubar.SubTrigger>Export</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.Item>PDF</Menubar.Item>
					<Menubar.Item>Markdown</Menubar.Item>
				</Menubar.SubContent>
			</Menubar.Sub>
			<Menubar.Separator />
			<Menubar.Item variant="destructive">Delete</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.CheckboxItem bind:checked={showArchived}>
				Show hidden files
			</Menubar.CheckboxItem>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.GroupHeading>Sort by</Menubar.GroupHeading>
				<Menubar.RadioGroup bind:value={sort}>
					<Menubar.RadioItem value="name">Name</Menubar.RadioItem>
					<Menubar.RadioItem value="modified">Date modified</Menubar.RadioItem>
					<Menubar.RadioItem value="size">Size</Menubar.RadioItem>
				</Menubar.RadioGroup>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
