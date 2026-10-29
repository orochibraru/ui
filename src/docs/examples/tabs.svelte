<script lang="ts">
	import * as Tabs from "#lib/components/ui/tabs/index.js";

	let tab = $state("projects");
</script>

<div class="grid gap-8">
	<Tabs.Root bind:value={tab}>
		<Tabs.List>
			<Tabs.Trigger value="projects">Projects</Tabs.Trigger>
			<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
			<Tabs.Trigger value="members">Members</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="projects" class="text-sm">
			12 projects, 4 archived.
		</Tabs.Content>
		<Tabs.Content value="activity" class="text-sm">
			Sam commented on the roadmap.
		</Tabs.Content>
		<Tabs.Content value="members" class="text-sm">
			Alex, Sam, Lou and you.
		</Tabs.Content>
	</Tabs.Root>
	<Tabs.Root value="week">
		<Tabs.List variant="line">
			<Tabs.Trigger value="week">This week</Tabs.Trigger>
			<Tabs.Trigger value="month">This month</Tabs.Trigger>
			<Tabs.Trigger value="year" disabled>This year</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</div>
