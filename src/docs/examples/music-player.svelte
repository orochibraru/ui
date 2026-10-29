<script lang="ts">
	import MusicPlayer from "#lib/components/blocks/music-player.svelte";

	const tracks = [
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Gymnopedie_No._1_%28ISRC_USUAN1100787%29.mp3",
			title: "Gymnopédie No. 1",
			artist: "Erik Satie, played by Kevin MacLeod",
		},
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/8/82/Nocturne_in_E_flat_major%2C_Op._9_no._2.mp3",
			title: "Nocturne in E-flat major, Op. 9 No. 2",
			artist: "Frédéric Chopin",
		},
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/6/63/Clair_de_Lune_-_Wright_Brass_-_United_States_Air_Force_Band_of_Flight.mp3",
			title: "Clair de Lune",
			artist: "Claude Debussy, US Air Force Band of Flight",
		},
	];

	let index = $state(0);
	let paused = $state(true);
</script>

<div class="grid gap-5">
	<p class="text-muted-foreground text-sm">
		It renders in flow, as wide as its container: wrap it in a fixed bar to dock
		it at the bottom of the screen. From Wikimedia Commons: Satie by Kevin
		MacLeod under CC BY 3.0, Chopin and Debussy in the public domain.
	</p>
	<MusicPlayer {tracks} bind:index bind:paused />
</div>
