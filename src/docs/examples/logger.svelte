<div class="grid gap-4">
	<p class="text-muted-foreground text-sm">
		Server only: what a <code>new Logger("Projects")</code> writes. Console
		format in development, one JSON line per entry with
		<code>LOG_FORMAT=json</code>, the active trace and span ids included so a
		line leads to its trace.
	</p>
	<pre
		class="overflow-x-auto rounded-xl bg-neutral-950 p-4 font-mono text-xs leading-relaxed text-neutral-200"><span
			class="text-neutral-500">14:02:11.408</span
		> <span class="text-sky-400">INFO </span> <span class="text-fuchsia-400"
			>[Projects]</span
		> Project created <span class="text-neutral-400"
			>{"{"} projectId: <span class="text-emerald-400">'p_81f2'</span
			> {"}"}</span
		>
<span class="text-neutral-500">14:02:11.412</span> <span class="text-sky-400"
			>INFO </span> <span class="text-fuchsia-400">[Http]</span> <b>POST</b
		> /projects <span class="text-emerald-400">201</span> <span
			class="text-neutral-500">38ms</span
		>
<span class="text-neutral-500">14:02:15.020</span> <span class="text-red-400"
			>ERROR</span
		> <span class="text-fuchsia-400">[Http]</span> <b>GET</b> /api/stats <span
			class="text-red-400">500</span
		> <span class="text-neutral-500">12ms</span></pre>
	<pre
		class="overflow-x-auto rounded-xl bg-neutral-950 p-4 font-mono text-xs leading-relaxed text-neutral-300">{`{"time":"2026-10-29T14:02:11.408Z","level":"info","scope":"Projects","message":"Project created","trace_id":"1ac71cdacfc998b028cb0a12aee24333","span_id":"c26a99096a72dd42","projectId":"p_81f2"}`}</pre>
</div>
