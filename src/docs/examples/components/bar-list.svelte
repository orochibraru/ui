<script lang="ts">
	import FileIcon from "@lucide/svelte/icons/file";
	import FileImageIcon from "@lucide/svelte/icons/file-image";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import FileVideoIcon from "@lucide/svelte/icons/file-video";

	import BarList from "#lib/components/kit/bar-list.svelte";
</script>

<BarList
	max={4}
	format={(value) => `${value} files`}
	items={[
		{ label: "Images", value: 412, icon: FileImageIcon, href: "#images" },
		{ label: "Documents", value: 268, icon: FileTextIcon, href: "#documents" },
		{ label: "Videos", value: 54, icon: FileVideoIcon, href: "#videos" },
		{ label: "Spreadsheets", value: 131, icon: FileIcon },
		{ label: "Archives", value: 17, icon: FileIcon },
		{ label: "Other", value: 9, icon: FileIcon },
	]}
/>
