<script lang="ts">
	import ConfirmDialog from "#lib/components/kit/confirm-dialog.svelte";

	let {
		open = $bindable(true),
		...rest
	}: { open?: boolean; title: string; onconfirm: () => unknown } & Record<
		string,
		unknown
	> = $props();
</script>

<ConfirmDialog bind:open {...rest} />
<output data-testid="open">{open}</output>
