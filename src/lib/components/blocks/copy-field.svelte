<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import { toast } from "svelte-sonner";

	import IconButton from "#lib/components/blocks/icon-button.svelte";

	const defaultMessages = {
		loading: "Copying",
		success: "Copied.",
		error: "Couldn't copy. Select the text instead.",
	};

	interface Props {
		value: string;
		label: string;
		messages?: Partial<typeof defaultMessages>;
	}

	const { value, label, messages = {} }: Props = $props();

	let copied = $state(false);

	async function copyCallback() {
		await navigator.clipboard.writeText(value);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function handleCopy() {
		toast.promise(copyCallback(), { ...defaultMessages, ...messages });
	}
</script>

<div class="bg-muted flex min-w-0 items-center gap-2 rounded-xl py-1 pr-1 pl-3">
	<span class="min-w-0 flex-1 truncate font-mono text-xs select-all"
		>{value}</span
	>
	<IconButton
		{label}
		icon={copied ? CheckIcon : CopyIcon}
		onclick={handleCopy}
	/>
</div>
