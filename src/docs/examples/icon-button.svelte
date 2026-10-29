<script lang="ts">
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	import IconButton from "#lib/components/blocks/icon-button.svelte";
</script>

<div class="flex flex-wrap items-center gap-2">
	<IconButton label="Edit" icon={PencilIcon} />
	<IconButton label="Settings" icon={SettingsIcon} href="#" variant="outline" />
	<IconButton label="Delete" icon={Trash2Icon} variant="destructive" />
</div>
