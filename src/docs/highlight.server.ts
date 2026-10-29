import { createHighlighter } from "shiki";

const highlighter = createHighlighter({
	themes: ["github-light", "github-dark"],
	langs: ["svelte", "ts", "css", "bash", "json"],
});

/** The code as HTML with both themes' colours as CSS variables, which the code block picks by the `dark` class. */
export async function highlight(code: string, lang: string): Promise<string> {
	return (await highlighter).codeToHtml(code, {
		lang,
		themes: { light: "github-light", dark: "github-dark" },
		defaultColor: false,
	});
}

export function langOf(fileName: string): string {
	return fileName.endsWith(".ts")
		? "ts"
		: fileName.endsWith(".css")
			? "css"
			: "svelte";
}
