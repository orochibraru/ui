<script lang="ts">
	import { page } from "$app/state";

	import { Button } from "../ui/button/index.js";

	const defaultMessages = {
		notFoundTitle: "Nothing here",
		notFoundDescription: "This page doesn't exist or was moved.",
		errorTitle: "Something went wrong",
		errorId: "Error ID",
		home: "Back home",
	};

	interface Props {
		homeHref: string;
		messages?: Partial<typeof defaultMessages>;
	}

	const { homeHref, messages = {} }: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
	const notFound = $derived(page.status === 404);
</script>

<div
	class="pt-safe-top pb-safe-bottom flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
>
	<p class="text-primary text-7xl font-bold tracking-tight tabular">
		{page.status}
	</p>
	<div>
		<h1 class="text-xl font-semibold">
			{notFound ? text.notFoundTitle : text.errorTitle}
		</h1>
		<p class="text-muted-foreground mt-2 text-sm">
			{notFound ? text.notFoundDescription : page.error?.message}
		</p>
		{#if page.error?.errorId}
			<p class="text-muted-foreground mt-3 font-mono text-xs">
				{text.errorId}: {page.error.errorId}
			</p>
		{/if}
	</div>
	<Button href={homeHref} size="lg" class="h-11 rounded-full px-6"
		>{text.home}</Button
	>
</div>
