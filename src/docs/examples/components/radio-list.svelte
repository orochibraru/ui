<script lang="ts">
	import RadioList from "#lib/components/kit/radio-list.svelte";

	let visibility = $state("team");
	let plan = $state("standard");
</script>

<div class="grid gap-6">
	<RadioList
		label="Visibility"
		name="visibility"
		description="You can change this later."
		options={[
			{ value: "private", label: "Private", description: "Only you." },
			{ value: "team", label: "Team", description: "Everyone in your team." },
			{
				value: "public",
				label: "Public",
				description: "Anyone with the link.",
				disabled: true,
			},
		]}
		bind:value={visibility}
	/>
	<RadioList
		label="Plan"
		name="plan"
		variant="cards"
		options={[
			{
				value: "starter",
				label: "Starter",
				description: "One project, three members.",
			},
			{
				value: "standard",
				label: "Standard",
				description: "Ten projects, unlimited members.",
			},
			{
				value: "enterprise",
				label: "Enterprise",
				description: "Single sign-on and audit log.",
			},
		]}
		bind:value={plan}
	/>
</div>
