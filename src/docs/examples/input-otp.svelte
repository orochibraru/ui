<script lang="ts">
	import * as InputOTP from "#lib/components/ui/input-otp/index.js";

	let code = $state("");
</script>

<div class="flex flex-col gap-3">
	<InputOTP.Root maxlength={6} bind:value={code}>
		{#snippet children({ cells })}
			<InputOTP.Group>
				{#each cells.slice(0, 3) as cell (cell)}
					<InputOTP.Slot {cell} />
				{/each}
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				{#each cells.slice(3, 6) as cell (cell)}
					<InputOTP.Slot {cell} />
				{/each}
			</InputOTP.Group>
		{/snippet}
	</InputOTP.Root>
	<p class="text-muted-foreground text-sm">
		{code.length === 6
			? `Verifying ${code}…`
			: "Enter the code we emailed you."}
	</p>
</div>
