<script lang="ts">
	import { setPageTitle } from "#lib/page-title.svelte.js";

	setPageTitle("Privacy and credits");
</script>

{#snippet external(href: string, label: string)}
	<a
		{href}
		class="text-primary underline-offset-4 hover:underline"
		target="_blank"
		rel="noreferrer">{label}</a
	>
{/snippet}

<article class="grid gap-8 text-sm leading-relaxed">
	<section class="grid gap-3">
		<h2 class="text-lg font-semibold">What this site keeps</h2>
		<p class="text-muted-foreground max-w-prose">
			No account, no cookies, no analytics, and the site's server writes no
			request logs of its own. Your browser keeps two things in its local
			storage, on your device only:
		</p>
		<ul class="text-muted-foreground grid max-w-prose list-disc gap-1 pl-5">
			<li>
				<code>mode-watcher-mode</code>: whether you picked light, dark or
				system.
			</li>
			<li>
				<code>acme-install-prompt</code>: only if the install prompt demo
				opened, so it doesn't open again.
			</li>
		</ul>
		<p class="text-muted-foreground max-w-prose">
			The accent you pick on the home page isn't saved. Copy buttons write to
			your clipboard and nothing else.
		</p>
	</section>

	<section class="grid gap-3">
		<h2 class="text-lg font-semibold">What it loads from elsewhere</h2>
		<p class="text-muted-foreground max-w-prose">
			The music player and video player pages stream their sample media from
			{@render external("https://commons.wikimedia.org", "Wikimedia Commons")}
			(upload.wikimedia.org), which sees your request like any site you visit. No
			other page loads anything from another site.
		</p>
		<p class="text-muted-foreground max-w-prose">
			Some buttons send you elsewhere when you press them: "Open in Claude" and
			"Open in ChatGPT" open those services with this page's address in the
			prompt, and "Add to Cursor" and "Add to VS Code" hand the MCP server's
			install command to the editor on your computer.
		</p>
	</section>

	<section class="grid gap-3">
		<h2 class="text-lg font-semibold">Credits</h2>
		<p class="text-muted-foreground max-w-prose">
			The primitives this package exports are
			{@render external("https://www.shadcn-svelte.com", "shadcn-svelte")}'s
			components, by Hunter Johnston and its contributors, a Svelte port of
			{@render external("https://ui.shadcn.com", "shadcn/ui")} by shadcn, both under
			the MIT license. Their documentation lives on the shadcn-svelte site; this package
			keeps them as the apps customised them.
		</p>
		<ul class="text-muted-foreground grid max-w-prose list-disc gap-1 pl-5">
			<li>
				{@render external("https://bits-ui.com", "Bits UI")} and
				{@render external(
					"https://github.com/huntabyte/vaul-svelte",
					"Vaul Svelte",
				)}
				underneath them (MIT).
			</li>
			<li>
				The file dropzone builds on the file drop zone from
				{@render external(
					"https://www.shadcn-svelte-extras.com",
					"shadcn-svelte-extras",
				)} by ieedan (MIT).
			</li>
			<li>
				Icons from {@render external("https://lucide.dev", "Lucide")} (ISC).
			</li>
			<li>
				{@render external("https://tailwindcss.com", "Tailwind CSS")} (MIT), code
				highlighting by {@render external("https://shiki.style", "Shiki")}
				(MIT), tracing with {@render external(
					"https://opentelemetry.io",
					"OpenTelemetry",
				)} (Apache 2.0).
			</li>
			<li>
				Music: Satie's Gymnopédie No. 1 played by Kevin MacLeod (CC BY 3.0); a
				public-domain recording of Chopin's Nocturne Op. 9 No. 2; Debussy's
				Clair de Lune by the US Air Force Band of Flight (public domain).
			</li>
			<li>Video: Big Buck Bunny, © Blender Foundation (CC BY 3.0).</li>
		</ul>
	</section>
</article>
