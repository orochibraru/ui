<script lang="ts">
	import Form, { type FormField } from "#lib/components/kit/form.svelte";

	const fields: FormField[] = [
		{ name: "name", label: "Project name", required: true },
		{
			name: "owner",
			type: "email",
			label: "Owner",
			autocomplete: "email",
			description: "They get the invitations and the weekly digest.",
		},
		{
			name: "visibility",
			type: "segmented",
			label: "Visibility",
			options: [
				{ value: "private", label: "Private" },
				{ value: "team", label: "Team" },
				{ value: "public", label: "Public" },
			],
		},
		{
			name: "role",
			type: "select",
			label: "Default role",
			options: [
				{ value: "viewer", label: "Viewer" },
				{ value: "editor", label: "Editor" },
				{ value: "admin", label: "Admin" },
			],
		},
		{ name: "due", type: "date", label: "Due date" },
		{
			name: "notify",
			type: "switch",
			label: "Notify the team",
			description: "Send an email when the project is created.",
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
			maxlength: 280,
		},
	];
</script>

<Form
	{fields}
	action="?/createProject"
	values={{ visibility: "team", role: "editor", notify: true }}
	messages={{
		submit: "Create project",
		loading: "Creating the project",
		success: "Project created.",
	}}
/>
