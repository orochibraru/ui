<script lang="ts">
	import { page } from "$app/state";

	import { Button } from "#lib/components/ui/button/index.js";
	import { cn } from "#lib/utils.js";

	const defaultMessages = {
		notFoundTitle: "Nothing here",
		notFoundDescription: "This page doesn't exist or was moved.",
		errorTitle: "Something went wrong",
		errorId: "Error ID",
		home: "Back home",
	};

	interface Props {
		homeHref: string;
		/** The status to show instead of the page's, to render an error screen outside +error.svelte. */
		status?: number;
		error?: App.Error | null;
		messages?: Partial<typeof defaultMessages>;
		class?: string;
	}

	const {
		homeHref,
		status,
		error,
		messages = {},
		class: className,
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
	const shownStatus = $derived(status ?? page.status);
	const shownError = $derived(error === undefined ? page.error : error);
	const notFound = $derived(shownStatus === 404);
</script>

<div
	class={cn(
		"pt-safe-top pb-safe-bottom flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center",
		className,
	)}
>
	<p class="text-primary text-7xl font-bold tracking-tight tabular">
		{shownStatus}
	</p>
	<div>
		<h1 class="text-xl font-semibold">
			{notFound ? text.notFoundTitle : text.errorTitle}
		</h1>
		<p class="text-muted-foreground mt-2 text-sm">
			{notFound ? text.notFoundDescription : shownError?.message}
		</p>
		{#if shownError?.errorId}
			<p class="text-muted-foreground mt-3 font-mono text-xs">
				{text.errorId}: {shownError.errorId}
			</p>
		{/if}
	</div>
	<Button href={homeHref} size="lg" class="h-11 rounded-full px-6"
		>{text.home}</Button
	>
</div>
