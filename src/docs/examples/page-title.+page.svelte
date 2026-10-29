<script lang="ts">
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import PlusIcon from "@lucide/svelte/icons/plus";

	import { setPageTitle } from "#lib/page-title.svelte.js";

	const { data } = $props();

	setPageTitle(() => data.project.name, "/projects", [
		{
			label: "New task",
			icon: PlusIcon,
			href: "/tasks/new",
			primary: true,
		},
		{ label: "Edit project", icon: PencilIcon, href: "/projects/edit" },
	]);
</script>
