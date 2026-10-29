<div class="grid gap-4">
	<p class="text-muted-foreground text-sm">
		Server only: <code>requestLog</code> writes one line per page or API request
		and skips assets and data requests; <code>unexpectedErrors</code> logs a crash,
		records it on the request's span and hands the error page its trace id as the
		error id.
	</p>
	<pre
		class="overflow-x-auto rounded-xl bg-neutral-950 p-4 font-mono text-xs leading-relaxed text-neutral-200"><span
			class="text-neutral-500">14:02:15.020</span
		> <span class="text-red-400">ERROR</span> <span class="text-fuchsia-400"
			>[Server]</span
		> Unhandled error <span class="text-neutral-400"
			>{"{"} errorId: <span class="text-emerald-400"
				>'1ac71cdacfc998b028cb0a12aee24333'</span
			>, path: <span class="text-emerald-400">'/api/stats'</span> {"}"}</span
		>
<span class="text-red-400">Error: The database didn't answer in time.</span>
<span
			class="text-neutral-500">    at load (src/routes/api/stats/+server.ts:12:11)</span
		>
<span class="text-neutral-500">14:02:15.020</span> <span class="text-red-400"
			>ERROR</span
		> <span class="text-fuchsia-400">[Http]</span> <b>GET</b> /api/stats <span
			class="text-red-400">500</span
		> <span class="text-neutral-500">12ms</span></pre>
</div>
