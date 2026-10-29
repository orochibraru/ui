<div class="grid gap-4">
	<p class="text-muted-foreground text-sm">
		Server only: started from <code>instrumentation.server.ts</code>, which runs
		before the app. With <code>tracing.server</code> on, SvelteKit's own spans for
		handle, load, actions and remote functions are exported with yours, and the logger
		stamps every JSON line with the active trace.
	</p>
	<pre
		class="overflow-x-auto rounded-xl bg-neutral-950 p-4 font-mono text-xs leading-relaxed text-neutral-200"><span
			class="text-neutral-500">14:01:58.102</span
		> <span class="text-sky-400">INFO </span> <span class="text-fuchsia-400"
			>[Telemetry]</span
		> Tracing on <span class="text-neutral-400"
			>{"{"} endpoint: <span class="text-emerald-400"
				>'http://collector:4318'</span
			>, serviceName: <span class="text-emerald-400">'acme'</span> {"}"}</span
		>

<span class="text-neutral-500">trace 1ac71cda…</span>
  sveltekit.handle.root            <span class="text-neutral-500">41ms</span>
  └─ sveltekit.load                 <span class="text-neutral-500">29ms</span>
     └─ projects.import             <span class="text-neutral-500">22ms</span
		></pre>
</div>
