<script lang="ts">
	import {
		type Chapter,
		chapterAt,
		formatTime,
	} from "#lib/components/blocks/video-player/format.js";

	interface Props {
		currentTime: number;
		duration: number;
		bufferedEnd: number;
		chapters: Chapter[];
		label: string;
		onseek: (time: number) => void;
	}

	const { currentTime, duration, bufferedEnd, chapters, label, onseek }: Props =
		$props();

	let track = $state<HTMLDivElement | null>(null);
	let hoverRatio = $state<number | null>(null);

	const ratio = (time: number) =>
		duration > 0 ? Math.min(1, Math.max(0, time / duration)) : 0;
	const hovered = $derived(
		hoverRatio === null ? null : chapterAt(chapters, hoverRatio * duration),
	);

	function onpointermove(event: PointerEvent) {
		if (!track || event.pointerType !== "mouse") {
			return;
		}
		const rect = track.getBoundingClientRect();
		hoverRatio =
			rect.width > 0
				? Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
				: null;
	}
</script>

<div
	bind:this={track}
	role="presentation"
	class="group/scrub relative flex h-6 items-center"
	{onpointermove}
	onpointerleave={() => (hoverRatio = null)}
>
	<div
		class="bg-foreground/15 pointer-events-none absolute inset-x-0 h-1.5 rounded-full transition-[height] group-hover/scrub:h-2"
	></div>
	<div
		class="bg-foreground/20 pointer-events-none absolute h-1.5 rounded-full transition-[height] group-hover/scrub:h-2"
		style:width="{ratio(bufferedEnd) * 100}%"
	></div>
	<div
		class="bg-primary glow pointer-events-none absolute h-1.5 rounded-full transition-[height] group-hover/scrub:h-2"
		style:width="{ratio(currentTime) * 100}%"
	></div>
	{#each chapters as chapter (chapter.start)}
		{#if chapter.start > 0 && chapter.start < duration}
			<div
				class="bg-background pointer-events-none absolute h-2.5 w-0.5 -translate-x-1/2 rounded-full"
				style:left="{ratio(chapter.start) * 100}%"
			></div>
		{/if}
	{/each}
	<div
		class="bg-primary ring-background pointer-events-none absolute size-3.5 -translate-x-1/2 rounded-full shadow-md ring-2 transition-transform group-focus-within/scrub:scale-125 group-hover/scrub:scale-125"
		style:left="{ratio(currentTime) * 100}%"
	></div>
	{#if hoverRatio !== null && duration > 0}
		<div
			class="bg-popover text-popover-foreground pointer-events-none absolute bottom-full mb-2 flex -translate-x-1/2 flex-col items-center rounded-lg px-2 py-1 text-xs font-medium tabular shadow-md"
			style:left="{hoverRatio * 100}%"
		>
			{#if hovered?.title}
				<span class="max-w-48 truncate font-semibold">{hovered.title}</span>
			{/if}
			<span class={hovered?.title ? "text-muted-foreground" : undefined}
				>{formatTime(hoverRatio * duration)}</span
			>
		</div>
	{/if}
	<input
		type="range"
		min="0"
		max={duration || 0}
		step="0.1"
		value={currentTime}
		aria-label={label}
		aria-valuetext="{formatTime(currentTime)} / {formatTime(duration)}"
		oninput={(event) => onseek(Number(event.currentTarget.value))}
		class="relative h-6 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
	/>
</div>
