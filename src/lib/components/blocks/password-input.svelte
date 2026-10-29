<script lang="ts">
	import EyeIcon from "@lucide/svelte/icons/eye";
	import EyeOffIcon from "@lucide/svelte/icons/eye-off";
	import type { HTMLInputAttributes } from "svelte/elements";

	import IconButton from "#lib/components/blocks/icon-button.svelte";
	import { Input } from "#lib/components/ui/input/index.js";
	import { cn } from "#lib/utils.js";

	const defaultMessages = {
		show: "Show password",
		hide: "Hide password",
	};

	type Props = Omit<HTMLInputAttributes, "type" | "value" | "files"> & {
		value?: string;
		visible?: boolean;
		messages?: Partial<typeof defaultMessages>;
	};

	let {
		value = $bindable(""),
		visible = $bindable(false),
		name = "password",
		autocomplete = "current-password",
		messages = {},
		class: className,
		...rest
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
</script>

<div class="relative">
	<Input
		{...rest}
		{name}
		{autocomplete}
		type={visible ? "text" : "password"}
		bind:value
		class={cn("h-11 pr-12", className)}
	/>
	<div class="absolute inset-y-0 right-0 flex items-center">
		<IconButton
			label={visible ? text.hide : text.show}
			icon={visible ? EyeOffIcon : EyeIcon}
			onclick={() => (visible = !visible)}
			class="size-11 md:size-11"
		/>
	</div>
</div>
