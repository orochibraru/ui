<script lang="ts">
	import * as Accordion from "#lib/components/ui/accordion/index.js";
</script>

<Accordion.Root type="single" value="split">
	<Accordion.Item value="split">
		<Accordion.Trigger>How are expenses split?</Accordion.Trigger>
		<Accordion.Content>
			Evenly between every member by default. Switch to shares or exact amounts
			when someone ordered the lobster.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="currency">
		<Accordion.Trigger>Can a group use several currencies?</Accordion.Trigger>
		<Accordion.Content>
			Yes. Each expense keeps its own currency and balances are converted at the
			day's rate.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="leave">
		<Accordion.Trigger>What happens when I leave a group?</Accordion.Trigger>
		<Accordion.Content>
			You can only leave once your balance is settled. Your past expenses stay
			in the history.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
