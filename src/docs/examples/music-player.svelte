<script lang="ts">
	import MusicPlayer from "#lib/components/blocks/music-player.svelte";

	const tracks = [
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/0/03/Music_to_Delight_%28ISRC_USUAN1200023%29.mp3",
			title: "Music to Delight",
			artist: "Kevin MacLeod",
		},
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Music_Box_Theme_%28ISRC_USUAN1100417%29.mp3",
			title: "Music Box Theme",
			artist: "Kevin MacLeod",
		},
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Industrial_Music_Box_%28ISRC_USUAN1100812%29.mp3",
			title: "Industrial Music Box",
			artist: "Kevin MacLeod",
		},
	];

	let index = $state(0);
	let paused = $state(true);
</script>

<p class="text-muted-foreground text-sm">
	It renders in flow, as wide as its container: wrap it in a fixed bar to dock
	it at the bottom of the screen. Tracks by Kevin MacLeod, CC BY 3.0, from
	Wikimedia Commons.
</p>
<MusicPlayer {tracks} bind:index bind:paused />
