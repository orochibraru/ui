import { readFileSync } from "node:fs";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import type { Content } from "./content.js";
import { createMcpServer } from "./mcp-server.js";

const content: Content = JSON.parse(
	readFileSync(new URL("./mcp-content.json", import.meta.url), "utf8"),
);

await createMcpServer(content).connect(new StdioServerTransport());
