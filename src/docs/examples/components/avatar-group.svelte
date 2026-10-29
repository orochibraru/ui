<script lang="ts">
	import AvatarGroup from "#lib/components/kit/avatar-group.svelte";

	const members = [
		{ name: "Alex Martin" },
		{ name: "Sam Lee" },
		{ name: "Jordan Kim" },
		{ name: "Robin Diaz" },
		{ name: "Casey Moreau" },
		{ name: "Taylor Nguyen" },
	];
</script>

<div class="flex flex-wrap items-center gap-6">
	<AvatarGroup people={members} size="sm" />
	<AvatarGroup people={members} max={3} />
	<AvatarGroup people={members.slice(0, 2)} size="lg" />
</div>
