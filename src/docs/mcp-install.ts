const name = "orochibraru-ui";
const command = "npx";
const args = ["-y", "@orochibraru/ui"];

/** How each IDE installs the package's stdio MCP server: a deep link for Cursor and VS Code, a command for Claude Code. */
export const mcpServer = {
	claudeCode: `claude mcp add ${name} -- ${command} ${args.join(" ")}`,
	cursorUrl: `cursor://anysphere.cursor-deeplink/mcp/install?name=${name}&config=${btoa(JSON.stringify({ command, args }))}`,
	vscodeUrl: `vscode:mcp/install?${encodeURIComponent(JSON.stringify({ name, command, args }))}`,
	json: JSON.stringify({ mcpServers: { [name]: { command, args } } }, null, 2),
};
