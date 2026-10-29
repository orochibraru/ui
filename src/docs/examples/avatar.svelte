<script lang="ts">
	import * as Avatar from "#lib/components/ui/avatar/index.js";
</script>

<div class="flex flex-wrap items-center gap-6">
	<Avatar.Root size="sm">
		<Avatar.Fallback>AM</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root>
		<Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
		<Avatar.Fallback>SC</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root size="lg">
		<Avatar.Fallback>NB</Avatar.Fallback>
		<Avatar.Badge />
	</Avatar.Root>
	<Avatar.Group>
		<Avatar.Root>
			<Avatar.Fallback>AL</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Fallback>SM</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Fallback>JD</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.GroupCount>+4</Avatar.GroupCount>
	</Avatar.Group>
</div>
