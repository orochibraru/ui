<script lang="ts">
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import PlusIcon from "@lucide/svelte/icons/plus";

	import { setPageTitle } from "#lib/page-title.svelte.js";

	const { data } = $props();

	setPageTitle(() => data.group.name, "/groups", [
		{
			label: "Add expense",
			icon: PlusIcon,
			href: "/expenses/new",
			primary: true,
		},
		{ label: "Edit group", icon: PencilIcon, href: "/groups/edit" },
	]);
</script>
