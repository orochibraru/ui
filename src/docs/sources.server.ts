import { version } from "../../package.json";
import readme from "../../README.md?raw";
import type { Content } from "./content.js";

const examples = import.meta.glob<string>("./examples/**/*", {
	eager: true,
	query: "?raw",
	import: "default",
});
const sectionRoute = import.meta.glob<string>("../routes/section/**/*", {
	eager: true,
	query: "?raw",
	import: "default",
});

/** The docs content read through Vite, for the site's pages, llms.txt and the hosted MCP server. */
export const content: Content = {
	version,
	readme,
	files: Object.fromEntries([
		...Object.entries(examples).map(([path, code]) => [path.slice(2), code]),
		...Object.entries(sectionRoute).map(([path, code]) => [
			path.slice(3),
			code,
		]),
	]),
};
