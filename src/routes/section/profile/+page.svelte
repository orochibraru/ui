<script lang="ts">
	import Input from "#lib/components/kit/input.svelte";
</script>

<div class="grid gap-5 md:grid-cols-2">
	<Input label="Name" name="name" value="Alex" />
	<Input label="Email" name="email" type="email" value="alex@example.com" />
</div>
