<script lang="ts">
	import Breadcrumbs from "#lib/components/kit/breadcrumbs.svelte";
</script>

<div class="grid gap-4">
	<Breadcrumbs
		items={[{ label: "Projects", href: "#projects" }, { label: "Website" }]}
	/>
	<Breadcrumbs
		items={[
			{ label: "Files", href: "#files" },
			{ label: "Shared", href: "#shared" },
			{ label: "Design", href: "#design" },
			{ label: "Assets", href: "#assets" },
			{ label: "Icons", href: "#icons" },
			{ label: "Navigation icons" },
		]}
	/>
</div>
