<script lang="ts">
	import { Input } from "#lib/components/ui/input/index.js";
	import { passwordRules, passwordScore } from "#lib/password.js";

	let password = $state("");

	const rules = $derived(passwordRules(password, "alex@example.com"));
	const score = $derived(passwordScore(password, "alex@example.com"));
</script>

<div class="grid gap-3">
	<Input
		type="text"
		placeholder="Type a password"
		aria-label="Password"
		bind:value={password}
	/>
	<p class="text-sm">Score: {score} / 4</p>
	<ul class="text-sm">
		{#each rules as rule (rule.id)}
			<li class={rule.passed ? "text-positive" : "text-muted-foreground"}>
				{rule.passed ? "✓" : "✗"}
				{rule.label}
			</li>
		{/each}
	</ul>
</div>
