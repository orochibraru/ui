<script lang="ts">
	import SettingSwitch from "#lib/components/blocks/setting-switch.svelte";
</script>

<form method="POST" action="?/save">
	<SettingSwitch
		name="push"
		label="Push notifications"
		description="On this device only."
		checked
	/>
	<SettingSwitch
		name="digest"
		label="Weekly digest"
		description="Every Monday morning."
		checked={false}
	/>
</form>
