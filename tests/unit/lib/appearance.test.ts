import { describe, expect, test } from "bun:test";

import { appearanceBootScript, applyAppearance } from "#lib/appearance.js";

const appearance = {
	accent: "green",
	theme: "system",
	darkVariant: "amoled",
	font: "serif",
	corners: "square",
};

describe("applyAppearance", () => {
	test("writes the data attributes and follows the system theme", () => {
		const root = document.createElement("html");
		applyAppearance(root, appearance, true);
		expect(root.dataset.accent).toBe("green");
		expect(root.dataset.darkVariant).toBe("amoled");
		expect(root.dataset.font).toBe("serif");
		expect(root.dataset.corners).toBe("square");
		expect(root.classList.contains("dark")).toBe(true);
		expect(root.style.colorScheme).toBe("dark");

		applyAppearance(root, appearance, false);
		expect(root.classList.contains("dark")).toBe(false);
		expect(root.style.colorScheme).toBe("light");
	});

	test("an explicit theme wins over the system preference", () => {
		const root = document.createElement("html");
		applyAppearance(root, { ...appearance, theme: "dark" }, false);
		expect(root.classList.contains("dark")).toBe(true);
		applyAppearance(root, { ...appearance, theme: "light" }, true);
		expect(root.classList.contains("dark")).toBe(false);
	});
});

describe("appearanceBootScript", () => {
	test("inlines the appearance without letting it close the script tag", () => {
		const script = appearanceBootScript({
			...appearance,
			accent: "</script><script>alert(1)",
		});
		expect(script.startsWith("<script>")).toBe(true);
		expect(script.match(/<\/script>/g)).toHaveLength(1);
		expect(script).toContain("\\u003c/script>");
	});
});
