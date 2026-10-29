<script lang="ts">
	import { resolve } from "$app/paths";

	import ErrorPage from "#lib/components/blocks/error-page.svelte";
</script>

<ErrorPage homeHref={resolve("/")} />
