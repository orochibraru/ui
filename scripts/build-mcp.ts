import { Glob } from "bun";

import type { Content } from "../src/docs/content.js";

const root = new URL("..", import.meta.url).pathname;

async function read(pattern: string, cwd: string, prefix: string) {
	const files: Record<string, string> = {};
	for await (const path of new Glob(pattern).scan({ cwd: `${root}${cwd}` })) {
		files[`${prefix}${path}`] = await Bun.file(`${root}${cwd}/${path}`).text();
	}
	return files;
}

const content: Content = {
	version: (await Bun.file(`${root}package.json`).json()).version,
	readme: await Bun.file(`${root}README.md`).text(),
	files: {
		...(await read("**/*", "src/docs/examples", "examples/")),
		...(await read("**/*", "src/routes/section", "routes/section/")),
	},
};

await Bun.write(`${root}dist/mcp-content.json`, JSON.stringify(content));

const result = await Bun.build({
	entrypoints: [`${root}src/docs/mcp-stdio.ts`],
	outdir: `${root}dist`,
	naming: "mcp.js",
	target: "node",
	format: "esm",
	minify: true,
	banner: "#!/usr/bin/env node",
});
if (!result.success) {
	throw new AggregateError(result.logs, "Bundling the MCP server failed");
}
