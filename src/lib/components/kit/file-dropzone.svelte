<script lang="ts" module>
	export type { FileRejection } from "./file-dropzone/files.js";
</script>

<script lang="ts">
	import FileIcon from "@lucide/svelte/icons/file";
	import FileAudioIcon from "@lucide/svelte/icons/file-headphone";
	import FileImageIcon from "@lucide/svelte/icons/file-image";
	import FileVideoIcon from "@lucide/svelte/icons/file-play";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import FolderUpIcon from "@lucide/svelte/icons/folder-up";
	import UploadIcon from "@lucide/svelte/icons/upload";
	import XIcon from "@lucide/svelte/icons/x";

	import { Button } from "#lib/components/ui/button/index.js";
	import { cn } from "#lib/utils.js";

	import FieldFrame, { errorList, type FieldProps } from "./field-frame.svelte";
	import {
		displaySize,
		type FileRejection,
		filesIn,
		rejectionOf,
	} from "./file-dropzone/files.js";

	const defaultMessages = {
		drop: "Drop files here, or click to choose",
		tap: "Tap to choose files",
		folder: "Or choose a folder",
		maxFiles: (count: number) =>
			count === 1 ? "One file" : `Up to ${count} files`,
		maxFileSize: (size: string) => `${size} max each`,
		remove: (name: string) => `Remove ${name}`,
	};

	type Props = FieldProps & {
		files?: File[];
		accept?: string;
		maxFiles?: number;
		maxFileSize?: number;
		folders?: boolean;
		onfiles?: (added: File[]) => void;
		onreject?: (rejected: { file: File; reason: FileRejection }) => void;
		messages?: Partial<typeof defaultMessages>;
	};

	let {
		files = $bindable([]),
		name,
		label,
		description,
		error,
		required = false,
		disabled = false,
		id,
		class: className,
		accept,
		maxFiles,
		maxFileSize,
		folders = false,
		onfiles,
		onreject,
		messages = {},
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });
	const generatedId = $props.id();
	const inputId = $derived(id ?? generatedId);
	const invalid = $derived(errorList(error).length > 0);
	const full = $derived(maxFiles !== undefined && files.length >= maxFiles);
	const blocked = $derived(disabled || full);
	const limits = $derived(
		[
			maxFiles !== undefined && text.maxFiles(maxFiles),
			maxFileSize !== undefined && text.maxFileSize(displaySize(maxFileSize)),
		]
			.filter(Boolean)
			.join(", "),
	);

	let input = $state<HTMLInputElement | null>(null);
	let dragDepth = $state(0);

	$effect(() => {
		if (!input || typeof DataTransfer === "undefined") {
			return;
		}
		const transfer = new DataTransfer();
		for (const file of files) {
			transfer.items.add(file);
		}
		input.files = transfer.files;
	});

	function add(incoming: File[]) {
		const accepted: File[] = [];
		for (const file of incoming) {
			const reason = rejectionOf(file, files.length + accepted.length + 1, {
				accept,
				maxFiles,
				maxFileSize,
			});
			if (reason) {
				onreject?.({ file, reason });
			} else {
				accepted.push(file);
			}
		}
		if (accepted.length > 0) {
			files = [...files, ...accepted];
			onfiles?.(accepted);
		}
	}

	function remove(index: number) {
		files = files.filter((_, position) => position !== index);
	}

	async function ondrop(event: DragEvent) {
		event.preventDefault();
		dragDepth = 0;
		if (blocked || !event.dataTransfer) {
			return;
		}
		const entries = Array.from(event.dataTransfer.items)
			.map((item) => item.webkitGetAsEntry?.())
			.filter((entry): entry is FileSystemEntry => Boolean(entry));
		if (folders && entries.some((entry) => entry.isDirectory)) {
			add((await Promise.all(entries.map(filesIn))).flat());
			return;
		}
		add(Array.from(event.dataTransfer.files));
	}

	function onpick(event: Event & { currentTarget: HTMLInputElement }) {
		const picked = Array.from(event.currentTarget.files ?? []);
		event.currentTarget.value = "";
		files = [...files];
		add(picked);
	}

	function iconOf(file: File) {
		if (file.type.startsWith("image/")) {
			return FileImageIcon;
		}
		if (file.type.startsWith("video/")) {
			return FileVideoIcon;
		}
		if (file.type.startsWith("audio/")) {
			return FileAudioIcon;
		}
		return file.type.startsWith("text/") || file.type === "application/pdf"
			? FileTextIcon
			: FileIcon;
	}
</script>

<FieldFrame
	id={inputId}
	{label}
	{description}
	{error}
	{required}
	class={className}
>
	<label
		for={inputId}
		aria-disabled={blocked || undefined}
		data-dragging={dragDepth > 0 || undefined}
		data-invalid={invalid || undefined}
		class="border-input hover:bg-accent/40 has-focus-visible:ring-ring/50 data-dragging:border-primary data-dragging:bg-primary/5 data-invalid:border-destructive flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-white p-6 text-center transition-colors has-focus-visible:ring-3 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 dark:bg-transparent"
		ondragenter={(event) => {
			event.preventDefault();
			dragDepth += 1;
		}}
		ondragover={(event) => event.preventDefault()}
		ondragleave={() => (dragDepth = Math.max(0, dragDepth - 1))}
		{ondrop}
	>
		<span
			class="bg-accent text-accent-foreground flex size-12 items-center justify-center rounded-2xl"
		>
			<UploadIcon class="size-6" />
		</span>
		<span class="font-medium">
			<span class="max-md:hidden">{text.drop}</span>
			<span class="md:hidden">{text.tap}</span>
		</span>
		{#if limits}
			<span class="text-muted-foreground text-sm">{limits}</span>
		{/if}
		<input
			bind:this={input}
			id={inputId}
			{name}
			type="file"
			{accept}
			multiple={maxFiles !== 1}
			disabled={blocked}
			aria-invalid={invalid || undefined}
			aria-describedby={invalid
				? `${inputId}-error`
				: description
					? `${inputId}-description`
					: undefined}
			class="sr-only"
			onchange={onpick}
		/>
	</label>
	{#if folders}
		<label
			class="text-primary has-focus-visible:ring-ring/50 inline-flex min-h-11 cursor-pointer items-center gap-2 self-start rounded-lg text-sm font-medium has-focus-visible:ring-3"
		>
			<FolderUpIcon class="size-4" />
			{text.folder}
			<input
				type="file"
				webkitdirectory
				disabled={blocked}
				class="sr-only"
				onchange={onpick}
			/>
		</label>
	{/if}
	{#if files.length > 0}
		<ul class="border-border divide-border divide-y rounded-2xl border">
			{#each files as file, index (`${file.name}-${file.size}-${index}`)}
				{@const Icon = iconOf(file)}
				<li class="flex min-h-14 items-center gap-3 py-2 pr-1.5 pl-3">
					<Icon class="text-muted-foreground size-5 shrink-0" />
					<span class="min-w-0 flex-1">
						<span class="block truncate text-sm font-medium"
							>{file.webkitRelativePath || file.name}</span
						>
						<span class="text-muted-foreground block text-xs tabular"
							>{displaySize(file.size)}</span
						>
					</span>
					<Button
						variant="ghost"
						size="icon"
						class={cn("size-11 rounded-full md:size-9")}
						aria-label={text.remove(file.name)}
						{disabled}
						onclick={() => remove(index)}
					>
						<XIcon />
					</Button>
				</li>
			{/each}
		</ul>
	{/if}
</FieldFrame>
