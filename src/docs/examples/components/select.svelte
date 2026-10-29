<script lang="ts">
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import LockIcon from "@lucide/svelte/icons/lock";
	import UsersIcon from "@lucide/svelte/icons/users";

	import Select from "#lib/components/kit/select.svelte";

	let role = $state("editor");
	let visibility = $state("");
	let country = $state("");

	const countries = [
		"Belgium",
		"Canada",
		"France",
		"Germany",
		"Italy",
		"Japan",
		"Spain",
		"Switzerland",
	].map((name) => ({ value: name.toLowerCase(), label: name }));
</script>

<div class="grid gap-4 md:grid-cols-2">
	<Select
		label="Role"
		name="role"
		options={[
			{ value: "viewer", label: "Viewer" },
			{ value: "editor", label: "Editor" },
			{ value: "owner", label: "Owner", disabled: true },
		]}
		bind:value={role}
	/>
	<Select
		label="Visibility"
		name="visibility"
		placeholder="Who can see it"
		description="You can change this later."
		options={[
			{
				value: "private",
				label: "Private",
				description: "Only you",
				icon: LockIcon,
			},
			{
				value: "team",
				label: "Team",
				description: "Everyone in the workspace",
				icon: UsersIcon,
			},
			{
				value: "public",
				label: "Public",
				description: "Anyone with the link",
				icon: GlobeIcon,
			},
		]}
		bind:value={visibility}
	/>
	<Select
		label="Country"
		name="country"
		searchable
		required
		options={countries}
		bind:value={country}
	/>
	<Select label="Region" options={[]} error="Pick a country first." disabled />
</div>
