import { highlight } from "../docs/highlight.server.js";
import { mcpServer } from "../docs/mcp-install.js";

const install = "bun add -d @orochibraru/ui";
const stylesheet =
	'@import "tailwindcss";\n@import "@orochibraru/ui/theme.css";';

export async function load() {
	return {
		install: { code: install, html: await highlight(install, "bash") },
		claudeCode: {
			code: mcpServer.claudeCode,
			html: await highlight(mcpServer.claudeCode, "bash"),
		},
		mcpJson: {
			code: mcpServer.json,
			html: await highlight(mcpServer.json, "json"),
		},
		stylesheet: {
			code: stylesheet,
			html: await highlight(stylesheet, "css"),
		},
	};
}
