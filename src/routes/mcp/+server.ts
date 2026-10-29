import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";

import {
	allDocs,
	docMarkdown,
	findBySlug,
	type Found,
	readme,
	search,
} from "../../docs/llms.js";

function listing(found: Found[]): string {
	return found
		.map(({ group, doc }) => `${group}/${doc.slug}: ${doc.description}`)
		.join("\n");
}

function text(value: string) {
	return { content: [{ type: "text" as const, text: value }] };
}

function server(): McpServer {
	const mcp = new McpServer(
		{ name: "orochibraru-ui", version: "1.0.0" },
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
		() => text(readme),
	);
	mcp.registerTool(
		"list_components",
		{
			description:
				"Every block, primitive and module, one per line as group/slug: description.",
			inputSchema: {
				group: z
					.enum(["blocks", "primitives", "modules"])
					.optional()
					.describe("Only this group."),
			},
			annotations: { readOnlyHint: true },
		},
		({ group }) =>
			text(
				listing(allDocs().filter((found) => !group || found.group === group)),
			),
	);
	mcp.registerTool(
		"search_components",
		{
			description:
				"Find components whose slug or description contains every word of the query.",
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
				? text(docMarkdown(found))
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

async function handle({ request }: { request: Request }): Promise<Response> {
	const transport = new WebStandardStreamableHTTPServerTransport({
		sessionIdGenerator: undefined,
		enableJsonResponse: true,
	});
	await server().connect(transport);
	return transport.handleRequest(request);
}

export const GET = handle;
export const POST = handle;
export const DELETE = handle;
