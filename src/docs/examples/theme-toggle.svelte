<script lang="ts">
	import ThemeToggle from "#lib/components/blocks/theme-toggle.svelte";
</script>

<div class="flex flex-wrap items-center gap-6">
	<ThemeToggle />
	<ThemeToggle
		messages={{ system: "Système", light: "Clair", dark: "Sombre" }}
	/>
</div>
