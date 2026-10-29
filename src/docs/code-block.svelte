<script lang="ts">
	import CopyIcon from "@lucide/svelte/icons/copy";
	import { toast } from "svelte-sonner";

	import IconButton from "#lib/components/blocks/icon-button.svelte";

	const { name, code, html }: { name: string; code: string; html: string } =
		$props();

	function copy() {
		toast.promise(navigator.clipboard.writeText(code), {
			loading: "Copying",
			success: "Copied.",
			error: "Couldn't copy. Select the text instead.",
		});
	}
</script>

<figure class="bg-muted/60 border-border overflow-hidden rounded-2xl border">
	<figcaption
		class="border-border flex items-center justify-between border-b py-1 pr-1 pl-4"
	>
		<span class="text-muted-foreground font-mono text-xs">{name}</span>
		<div class="print:hidden">
			<IconButton label="Copy {name}" icon={CopyIcon} onclick={copy} />
		</div>
	</figcaption>
	<div
		class="overflow-x-auto p-4 text-[0.8125rem] print:overflow-visible print:[&_pre]:whitespace-pre-wrap leading-relaxed tab-2 [&_.shiki_span]:text-(--shiki-light) dark:[&_.shiki_span]:text-(--shiki-dark)"
	>
		{@html html}
	</div>
</figure>
