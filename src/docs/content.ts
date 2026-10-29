import { catalog, type CatalogDoc, type Group } from "./catalog.js";

/** The docs as plain data: the README and the example files keyed by their path from src/docs or src/routes. */
export interface Content {
	version: string;
	readme: string;
	files: Record<string, string>;
}

export interface SourceFile {
	name: string;
	code: string;
}

export interface Found {
	group: Group;
	doc: CatalogDoc;
}

export function allDocs(): Found[] {
	return Object.entries(catalog).flatMap(([group, { docs }]) =>
		docs.map((doc) => ({ group: group as Group, doc })),
	);
}

export function findBySlug(slug: string): Found | undefined {
	return allDocs().find(({ doc }) => doc.slug === slug);
}

export function search(query: string): Found[] {
	const words = query.toLowerCase().split(/\s+/).filter(Boolean);
	return allDocs().filter(({ doc }) => {
		const text = `${doc.slug} ${doc.category} ${doc.description}`.toLowerCase();
		return words.every((word) => text.includes(word));
	});
}

/**
 * The files a doc page shows: its example, then the example's companions (`<slug>.<file>`), which show how an app
 * wires up what the preview can't hold, a layout, an action or a whole page. An example without a script is only a
 * note for the preview and isn't shown; tab-section shows its live demo route.
 */
export function sourcesOf(content: Content, slug: string): SourceFile[] {
	const entries = Object.entries(content.files);
	if (slug === "tab-section") {
		return entries
			.filter(([path]) => path.startsWith("routes/section/"))
			.map(([path, code]) => ({
				name: path.slice("routes/".length),
				code: publicImports(code),
			}));
	}
	const main = content.files[`examples/${slug}.svelte`];
	const files = entries.flatMap(([path, code]) =>
		path.startsWith(`examples/${slug}.`) && path !== `examples/${slug}.svelte`
			? [{ name: path.slice(`examples/${slug}.`.length), code }]
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

/** One component's page as Markdown: what it is, how to import it, and the example files. */
export function docMarkdown(content: Content, { group, doc }: Found): string {
	const path = group === "blocks" ? `blocks/${doc.slug}` : doc.slug;
	const files = sourcesOf(content, doc.slug).map(
		(file) =>
			`### ${file.name}\n\n\`\`\`${file.name.endsWith(".ts") ? "ts" : "svelte"}\n${file.code.trimEnd()}\n\`\`\``,
	);
	return [
		`# ${doc.name}`,
		`> ${doc.description}`,
		`Category: ${doc.category}. Import from \`@orochibraru/ui/${path}\`.`,
		files.length > 0 ? `## Usage\n\n${files.join("\n\n")}` : "",
	]
		.filter(Boolean)
		.join("\n\n");
}

/** The llms.txt index: a link per component's Markdown page. */
export function llmsIndex(origin: string): string {
	const sections = Object.entries(catalog).map(
		([group, { label, description, docs }]) =>
			`## ${label}\n\n${description}\n\n${docs
				.map(
					(doc) =>
						`- [${doc.name}](${origin}/${group}/${doc.slug}.md): ${doc.description}`,
				)
				.join("\n")}`,
	);
	return [
		"# @orochibraru/ui",
		"> Svelte 5 components and the theme shared by OpenCount, LocalAssistant, Homerun, Sergio's, Nuvio Web and Penombre. SvelteKit 3, Svelte 5 runes, Tailwind CSS v4.",
		`Everything in one file: ${origin}/llms-full.txt. An MCP server with the same content is at ${origin}/mcp, or runs locally with \`npx -y @orochibraru/ui\`.`,
		...sections,
	].join("\n\n");
}

/** Every component page, after the README, in one file. */
export function llmsFull(content: Content): string {
	return [
		content.readme.trimEnd(),
		...allDocs().map((found) => docMarkdown(content, found)),
	].join("\n\n---\n\n");
}
