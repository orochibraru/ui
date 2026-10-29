import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { categories } from "./catalog.js";
import {
	allDocs,
	type Content,
	docMarkdown,
	findBySlug,
	type Found,
	search,
} from "./content.js";

function listing(found: Found[]): string {
	return found
		.map(
			({ group, doc }) =>
				`${group}/${doc.slug} (${doc.category}): ${doc.description}`,
		)
		.join("\n");
}

function text(value: string) {
	return { content: [{ type: "text" as const, text: value }] };
}

/** The docs MCP server, the same for the hosted endpoint and the one the package runs over stdio. */
export function createMcpServer(content: Content): McpServer {
	const mcp = new McpServer(
		{ name: "orochibraru-ui", version: content.version },
		{
			instructions:
				"Docs for @orochibraru/ui, the Svelte 5 components and theme shared by the orochibraru apps. Start with get_setup to install it, list_components or search_components to find one, then get_component for its usage code.",
		},
	);
	mcp.registerTool(
		"get_setup",
		{
			description:
				"How to install @orochibraru/ui, import the theme, theme an app and use the blocks and modules.",
			annotations: { readOnlyHint: true },
		},
		() => text(content.readme),
	);
	mcp.registerTool(
		"list_components",
		{
			description:
				"Every block, primitive and module, one per line as group/slug (category): description.",
			inputSchema: {
				group: z
					.enum(["blocks", "primitives", "modules"])
					.optional()
					.describe("Only this group."),
				category: z.enum(categories).optional().describe("Only this category."),
			},
			annotations: { readOnlyHint: true },
		},
		({ group, category }) =>
			text(
				listing(
					allDocs().filter(
						(found) =>
							(!group || found.group === group) &&
							(!category || found.doc.category === category),
					),
				),
			),
	);
	mcp.registerTool(
		"search_components",
		{
			description:
				"Find components whose slug, category or description contains every word of the query.",
			inputSchema: { query: z.string().min(1).describe("Words to look for.") },
			annotations: { readOnlyHint: true },
		},
		({ query }) => {
			const found = search(query);
			return text(found.length > 0 ? listing(found) : "No component matches.");
		},
	);
	mcp.registerTool(
		"get_component",
		{
			description:
				"One component's docs: what it is, its import path and its usage code.",
			inputSchema: {
				slug: z.string().describe("The component's slug, like stat-card."),
			},
			annotations: { readOnlyHint: true },
		},
		({ slug }) => {
			const found = findBySlug(slug);
			return found
				? text(docMarkdown(content, found))
				: {
						...text(
							`No component "${slug}". Call list_components for the slugs.`,
						),
						isError: true,
					};
		},
	);
	return mcp;
}
