<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import XIcon from "@lucide/svelte/icons/x";
	import { untrack } from "svelte";

	import PasswordInput from "#lib/components/blocks/password-input.svelte";
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import {
		passwordMaxLength,
		passwordRules,
		passwordScore,
	} from "#lib/password.js";

	const defaultMessages = {
		password: "Password",
		confirm: "Type it again",
		mismatch: "The passwords don't match.",
		weak: "Weak",
		fair: "Fair",
		good: "Good",
		strong: "Strong",
		show: "Show password",
		hide: "Hide password",
	};

	interface Props {
		value?: string;
		email?: string;
		errors?: Record<string, string[] | undefined>;
		ruleLabels?: Record<string, string>;
		messages?: Partial<typeof defaultMessages>;
	}

	let {
		value = $bindable(""),
		email = "",
		errors = {},
		ruleLabels = {},
		messages = {},
	}: Props = $props();

	let confirmation = $state("");
	let visible = $state(false);

	const text = $derived({ ...defaultMessages, ...messages });
	const rules = $derived(
		passwordRules(value, email).filter((rule) => rule.id !== "max"),
	);
	const score = $derived(passwordScore(value, email));
	const strengthLabels = $derived([
		"",
		text.weak,
		text.fair,
		text.good,
		text.strong,
	]);
	const strengthColors = [
		"bg-muted",
		"bg-destructive",
		"bg-orange-500",
		"bg-primary/70",
		"bg-primary",
	];
	const mismatch = $derived(confirmation.length > 0 && confirmation !== value);
	const submitted = $derived.by(() => {
		void errors;
		return untrack(() => ({ value, confirmation }));
	});
	const edited = $derived(
		value !== submitted.value || confirmation !== submitted.confirmation,
	);
</script>

<Field.Field>
	<Field.Label for="new-password">{text.password}</Field.Label>
	<PasswordInput
		id="new-password"
		autocomplete="new-password"
		maxlength={passwordMaxLength}
		required
		bind:value
		bind:visible
		messages={{ show: text.show, hide: text.hide }}
	/>
	<div class="mt-1 flex items-center gap-2" aria-live="polite">
		<div class="flex flex-1 gap-1">
			{#each [1, 2, 3, 4] as step (step)}
				<span
					class="h-1.5 flex-1 rounded-full transition-colors {score >= step
						? strengthColors[score]
						: 'bg-muted'}"
				></span>
			{/each}
		</div>
		<span class="text-muted-foreground w-12 text-right text-xs"
			>{strengthLabels[score]}</span
		>
	</div>
	<ul class="mt-1 flex flex-col gap-1 text-sm">
		{#each rules as rule (rule.id)}
			<li
				class="flex items-center gap-2 {rule.passed
					? 'text-positive'
					: 'text-muted-foreground'}"
			>
				{#if rule.passed}<CheckIcon class="size-4" />{:else}<XIcon
						class="size-4"
					/>{/if}
				{ruleLabels[rule.id] ?? rule.label}
			</li>
		{/each}
	</ul>
	<Field.Error
		errors={edited
			? undefined
			: errors.password?.map((message) => ({ message }))}
	/>
</Field.Field>
<Field.Field>
	<Field.Label for="confirm-password">{text.confirm}</Field.Label>
	<Input
		id="confirm-password"
		name="confirmPassword"
		type={visible ? "text" : "password"}
		autocomplete="new-password"
		maxlength={passwordMaxLength}
		required
		bind:value={confirmation}
		aria-invalid={mismatch}
		class="h-11"
	/>
	{#if mismatch}
		<p class="text-destructive text-sm">{text.mismatch}</p>
	{/if}
	<Field.Error
		errors={edited
			? undefined
			: errors.confirmPassword?.map((message) => ({ message }))}
	/>
</Field.Field>
