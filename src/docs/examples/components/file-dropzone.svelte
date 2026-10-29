<script lang="ts">
	import { toast } from "svelte-sonner";

	import FileDropzone, {
		type FileRejection,
	} from "#lib/components/kit/file-dropzone.svelte";

	const reasons: Record<FileRejection, string> = {
		"too-large": "is over 10 MB",
		"too-many": "is one file too many",
		type: "isn't an image or a PDF",
	};

	let files = $state<File[]>([]);
</script>

<FileDropzone
	label="Attachments"
	name="attachments"
	description="Images or PDFs, shared with the whole team."
	accept="image/*,.pdf"
	maxFiles={5}
	maxFileSize={10 * 1024 * 1024}
	folders
	bind:files
	onreject={({ file, reason }) =>
		toast.error(`${file.name} ${reasons[reason]}.`)}
/>
