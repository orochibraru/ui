<script lang="ts">
	import VideoPlayer from "#lib/components/blocks/video-player.svelte";

	let currentTime = $state(0);
</script>

<div class="grid gap-3">
	<VideoPlayer
		src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.720p.vp9.webm"
		poster="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Big_Buck_Bunny_4K.webm/1280px--Big_Buck_Bunny_4K.webm.jpg"
		title="Big Buck Bunny"
		chapters={[
			{ start: 0, title: "Opening" },
			{ start: 240, title: "Middle" },
			{ start: 490, title: "Credits" },
		]}
		bind:currentTime
	/>
	<p class="text-muted-foreground text-sm">
		Space or K plays and pauses, the arrows seek and change the volume, F goes
		fullscreen, M mutes. On a phone, tap to show the controls and double-tap a
		side to seek. At {Math.floor(currentTime)} s. Big Buck Bunny © Blender Foundation,
		CC BY 3.0.
	</p>
</div>
