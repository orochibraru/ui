import readme from "../../README.md?raw";
import { type Doc, type Group, groups } from "./registry.js";
import { sourcesOf } from "./sources.server.js";

export { readme };

export interface Found {
	group: Group;
	doc: Doc;
}

export function allDocs(): Found[] {
	return Object.entries(groups).flatMap(([group, { docs }]) =>
		docs.map((doc) => ({ group: group as Group, doc })),
	);
}

export function findBySlug(slug: string): Found | undefined {
	return allDocs().find(({ doc }) => doc.slug === slug);
}

export function search(query: string): Found[] {
	const words = query.toLowerCase().split(/\s+/).filter(Boolean);
	return allDocs().filter(({ doc }) => {
		const text = `${doc.slug} ${doc.description}`.toLowerCase();
		return words.every((word) => text.includes(word));
	});
}

/** One component's page as Markdown: what it is, how to import it, and the example files. */
export function docMarkdown({ group, doc }: Found): string {
	const path = group === "blocks" ? `blocks/${doc.slug}` : doc.slug;
	const files = sourcesOf(doc.slug).map(
		(file) =>
			`### ${file.name}\n\n\`\`\`${file.name.endsWith(".ts") ? "ts" : "svelte"}\n${file.code.trimEnd()}\n\`\`\``,
	);
	return [
		`# ${doc.name}`,
		`> ${doc.description}`,
		`Import from \`@orochibraru/ui/${path}\`.`,
		files.length > 0 ? `## Usage\n\n${files.join("\n\n")}` : "",
	]
		.filter(Boolean)
		.join("\n\n");
}

/** The llms.txt index: the setup guide and a link per component's Markdown page. */
export function llmsIndex(origin: string): string {
	const sections = Object.entries(groups).map(
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
		`Everything in one file: ${origin}/llms-full.txt. An MCP server with the same content is at ${origin}/mcp.`,
		...sections,
	].join("\n\n");
}

/** Every component page, after the README, in one file. */
export function llmsFull(): string {
	return [readme.trimEnd(), ...allDocs().map(docMarkdown)].join("\n\n---\n\n");
}
