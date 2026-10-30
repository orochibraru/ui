<script lang="ts">
	import CheckboxList from "#lib/components/kit/checkbox-list.svelte";

	let channels = $state(["email"]);
	let days = $state<string[]>([]);
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
	<CheckboxList
		label="Notify me by"
		name="channels"
		description="Pick as many as you like."
		options={[
			{
				value: "email",
				label: "Email",
				description: "Sent to your account address.",
			},
			{
				value: "push",
				label: "Push",
				description: "On every signed-in device.",
			},
			{
				value: "sms",
				label: "Text message",
				description: "Add a phone number first.",
				disabled: true,
			},
		]}
		bind:value={channels}
	/>
	<CheckboxList
		label="Working days"
		name="days"
		orientation="horizontal"
		required
		error={days.length === 0 ? "Pick at least one day." : undefined}
		options={[
			{ value: "mon", label: "Mon" },
			{ value: "tue", label: "Tue" },
			{ value: "wed", label: "Wed" },
			{ value: "thu", label: "Thu" },
			{ value: "fri", label: "Fri" },
		]}
		bind:value={days}
	/>
</div>
