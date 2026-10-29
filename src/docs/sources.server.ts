export interface SourceFile {
	name: string;
	code: string;
}

const examples = import.meta.glob<string>("./examples/*", {
	eager: true,
	query: "?raw",
	import: "default",
});
const sectionRoute = import.meta.glob<string>("../routes/section/**/*", {
	eager: true,
	query: "?raw",
	import: "default",
});

/**
 * The files a doc page shows: its example, then the example's companions (`<slug>.<file>`), which show how an app
 * wires up what the preview can't hold, a layout, an action or a whole page. An example without a script is only a
 * note for the preview and isn't shown; tab-section shows its live demo route.
 */
export function sourcesOf(slug: string): SourceFile[] {
	if (slug === "tab-section") {
		return Object.entries(sectionRoute).map(([path, code]) => ({
			name: path.slice("../routes/".length),
			code: publicImports(code),
		}));
	}
	const main = examples[`./examples/${slug}.svelte`];
	const files = Object.entries(examples).flatMap(([path, code]) =>
		path.startsWith(`./examples/${slug}.`) &&
		path !== `./examples/${slug}.svelte`
			? [{ name: path.slice(`./examples/${slug}.`.length), code }]
			: [],
	);
	if (main?.includes("<script")) {
		files.unshift({ name: "Example.svelte", code: main });
	}
	return files.map(({ name, code }) => ({ name, code: publicImports(code) }));
}

/** Rewrites the repo's `#lib` imports to the package subpaths an app imports. */
function publicImports(code: string): string {
	return code
		.replaceAll(
			/#lib\/components\/ui\/([\w-]+)\/index\.js/g,
			"@orochibraru/ui/$1",
		)
		.replaceAll(
			/#lib\/components\/blocks\/([\w-]+)\.svelte/g,
			"@orochibraru/ui/blocks/$1",
		)
		.replaceAll(/#lib\/([\w-]+)(?:\.svelte)?\.js/g, "@orochibraru/ui/$1");
}
