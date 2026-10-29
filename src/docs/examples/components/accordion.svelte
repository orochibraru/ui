<script lang="ts">
	import Accordion from "#lib/components/kit/accordion.svelte";

	let open = $state("Who can see a project?");
</script>

<Accordion
	bind:value={open}
	items={[
		{
			title: "Who can see a project?",
			content:
				"Every member of the workspace. Guests only see the projects they were invited to.",
		},
		{
			title: "Can I restore a deleted file?",
			content:
				"Yes, for 30 days.\nOpen the project's trash and pick the file to bring back.",
		},
		{
			title: "How do I invite a member?",
			content: "Open the members page and send an invitation by email.",
		},
	]}
/>
