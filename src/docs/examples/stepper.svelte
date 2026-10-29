<script lang="ts">
	import FolderPlusIcon from "@lucide/svelte/icons/folder-plus";
	import ListChecksIcon from "@lucide/svelte/icons/list-checks";
	import UsersIcon from "@lucide/svelte/icons/users";
	import { toast } from "svelte-sonner";

	import Stepper from "#lib/components/blocks/stepper.svelte";
	import Input from "#lib/components/kit/input.svelte";
	import { Button } from "#lib/components/ui/button/index.js";

	const steps = [
		{
			label: "Basics",
			description: "Give the project a name people will recognize.",
			icon: FolderPlusIcon,
		},
		{
			label: "Team",
			description: "Invite someone to work on it with you.",
			icon: UsersIcon,
		},
		{
			label: "Review",
			description: "Check everything before creating it.",
			icon: ListChecksIcon,
		},
	];

	let active = $state(0);
	let name = $state("");
	let summary = $state("");
	let invite = $state("");
	let attempted = $state(false);

	const nameMissing = $derived(attempted && name.trim() === "");

	function onnext(step: number) {
		if (step === 0) {
			attempted = true;
			return name.trim() !== "";
		}
		return true;
	}

	function create() {
		toast.success("Project created.", { description: name });
	}
</script>

<Stepper {steps} bind:active {onnext}>
	<div class="grid gap-5" hidden={active !== 0}>
		<Input
			label="Name"
			placeholder="Website redesign"
			error={nameMissing ? "Give the project a name." : undefined}
			bind:value={name}
		/>
		<Input
			label="Summary"
			placeholder="What it's about, in one line"
			bind:value={summary}
		/>
	</div>

	<div class="grid gap-5" hidden={active !== 1}>
		<Input
			label="Email"
			type="email"
			placeholder="sam@example.com"
			description="Optional, you can invite people later."
			bind:value={invite}
		/>
	</div>

	<dl class="grid gap-3 text-sm" hidden={active !== 2}>
		<div>
			<dt class="text-muted-foreground">Name</dt>
			<dd class="font-medium">{name}</dd>
		</div>
		<div>
			<dt class="text-muted-foreground">Summary</dt>
			<dd class="font-medium">{summary || "None"}</dd>
		</div>
		<div>
			<dt class="text-muted-foreground">Invited</dt>
			<dd class="font-medium">{invite || "Nobody yet"}</dd>
		</div>
	</dl>

	{#snippet finish()}
		<Button class="glow h-11 rounded-full px-5" onclick={create}>
			Create project
		</Button>
	{/snippet}
</Stepper>
