<script lang="ts">
	import DataTable from "#lib/components/kit/data-table.svelte";
	import StatusBadge from "#lib/components/kit/status-badge.svelte";

	interface Project {
		name: string;
		owner: string;
		status: "active" | "paused" | "archived";
		files: number;
		updated: Date;
	}

	const projects: Project[] = [
		{
			name: "Website refresh",
			owner: "Alex Martin",
			status: "active",
			files: 128,
			updated: new Date("2026-10-21"),
		},
		{
			name: "Onboarding guide",
			owner: "Sam Lee",
			status: "paused",
			files: 42,
			updated: new Date("2026-09-30"),
		},
		{
			name: "Brand assets",
			owner: "Jordan Kim",
			status: "active",
			files: 310,
			updated: new Date("2026-10-27"),
		},
		{
			name: "Annual report",
			owner: "Robin Diaz",
			status: "archived",
			files: 76,
			updated: new Date("2026-03-14"),
		},
	];

	const dateFormat = new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeZone: "UTC",
	});
</script>

<DataTable
	rows={projects}
	rowHref={(project) => `#${project.name.toLowerCase().replaceAll(" ", "-")}`}
	columns={[
		{ key: "name", label: "Project", sortable: true },
		{ key: "owner", label: "Owner", hideOnMobile: true },
		{ key: "status", label: "Status" },
		{ key: "files", label: "Files", align: "right", sortable: true },
		{
			key: "updated",
			label: "Updated",
			align: "right",
			sortable: true,
			format: (value) => dateFormat.format(value),
		},
	]}
>
	{#snippet cell(project, column, text)}
		{#if column.key === "status"}
			<StatusBadge
				status={project.status}
				tones={{ active: "positive", paused: "warning", archived: "neutral" }}
				labels={{ active: "Active", paused: "Paused", archived: "Archived" }}
			/>
		{:else}
			{text}
		{/if}
	{/snippet}
</DataTable>
