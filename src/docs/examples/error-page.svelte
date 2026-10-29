<script lang="ts">
	import ErrorPage from "#lib/components/blocks/error-page.svelte";
	import * as Tabs from "#lib/components/ui/tabs/index.js";

	let status = $state("404");
</script>

<Tabs.Root bind:value={status}>
	<Tabs.List>
		<Tabs.Trigger value="404">404</Tabs.Trigger>
		<Tabs.Trigger value="500">500</Tabs.Trigger>
	</Tabs.List>
</Tabs.Root>
<ErrorPage
	homeHref="/"
	status={Number(status)}
	error={{
		message: "The database didn't answer in time.",
		status: Number(status),
		errorId: "7f3a9c21",
	}}
	class="min-h-96"
/>
