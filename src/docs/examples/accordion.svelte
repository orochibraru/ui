<script lang="ts">
	import * as Accordion from "#lib/components/ui/accordion/index.js";
</script>

<Accordion.Root type="single" value="invite">
	<Accordion.Item value="invite">
		<Accordion.Trigger>How do I invite team members?</Accordion.Trigger>
		<Accordion.Content>
			Open the project settings and send an invite by email. They join with the
			role you pick.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="export">
		<Accordion.Trigger>Can I export my documents?</Accordion.Trigger>
		<Accordion.Content>
			Yes. Every document exports to PDF or Markdown from its menu.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="delete">
		<Accordion.Trigger>What happens when I delete a project?</Accordion.Trigger>
		<Accordion.Content>
			It stays in the trash for 30 days, then it is gone for good with all its
			files.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
