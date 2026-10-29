<script lang="ts">
	import type { Snippet } from "svelte";
	import { MediaQuery } from "svelte/reactivity";

	import * as AlertDialog from "#lib/components/ui/alert-dialog/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import * as Drawer from "#lib/components/ui/drawer/index.js";
	import { Spinner } from "#lib/components/ui/spinner/index.js";

	const defaultMessages = {
		confirm: "Confirm",
		cancel: "Cancel",
		working: "Working…",
	};

	interface Props {
		open?: boolean;
		title: string;
		description?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		destructive?: boolean;
		/** A returned promise keeps the dialog open with a spinner until it settles: it closes on success and stays open on rejection, so report the error yourself. */
		onconfirm: () => unknown;
		children?: Snippet;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		open = $bindable(false),
		title,
		description,
		confirmLabel,
		cancelLabel,
		destructive = false,
		onconfirm,
		children,
		messages = {},
	}: Props = $props();

	const desktop = new MediaQuery("(min-width: 768px)");
	const text = $derived({ ...defaultMessages, ...messages });

	let pending = $state(false);

	function setOpen(next: boolean) {
		if (!pending) {
			open = next;
		}
	}

	async function confirm() {
		const result = onconfirm();
		if (!(result instanceof Promise)) {
			open = false;
			return;
		}
		pending = true;
		const succeeded = await result.then(
			() => true,
			() => false,
		);
		pending = false;
		if (succeeded) {
			open = false;
		}
	}
</script>

{#snippet actions()}
	<Button
		variant="outline"
		class="h-11 rounded-xl md:h-9"
		disabled={pending}
		onclick={() => setOpen(false)}
	>
		{cancelLabel ?? text.cancel}
	</Button>
	<Button
		variant={destructive ? "destructive" : "default"}
		class="h-11 rounded-xl md:h-9"
		disabled={pending}
		aria-busy={pending || undefined}
		onclick={confirm}
	>
		{#if pending}
			<Spinner aria-label={text.working} />
		{/if}
		{confirmLabel ?? text.confirm}
	</Button>
{/snippet}

{#if desktop.current}
	<AlertDialog.Root bind:open={() => open, setOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{title}</AlertDialog.Title>
				{#if description}
					<AlertDialog.Description>{description}</AlertDialog.Description>
				{/if}
			</AlertDialog.Header>
			{#if children}
				<div class="grid gap-3">{@render children()}</div>
			{/if}
			<AlertDialog.Footer>
				{@render actions()}
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{:else}
	<Drawer.Root bind:open={() => open, setOpen} dismissible={!pending}>
		<Drawer.Content>
			<Drawer.Header class="px-5 text-left">
				<Drawer.Title>{title}</Drawer.Title>
				{#if description}
					<Drawer.Description>{description}</Drawer.Description>
				{/if}
			</Drawer.Header>
			{#if children}
				<div class="grid gap-3 px-5">{@render children()}</div>
			{/if}
			<div class="flex flex-col-reverse gap-2 px-5 pt-4 pb-4">
				{@render actions()}
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
