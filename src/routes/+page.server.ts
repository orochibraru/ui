import { highlight } from "../docs/highlight.server.js";

const install = "bun add -d @orochibraru/ui";
const stylesheet =
	'@import "tailwindcss";\n@import "@orochibraru/ui/theme.css";';

export async function load() {
	return {
		install: { code: install, html: await highlight(install, "bash") },
		stylesheet: {
			code: stylesheet,
			html: await highlight(stylesheet, "css"),
		},
	};
}
