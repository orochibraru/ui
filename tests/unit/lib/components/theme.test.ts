import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

const setMode = mock((_mode: string) => undefined);
mock.module("mode-watcher", () => ({
	setMode,
	userPrefersMode: { current: "system" },
}));

const { default: ThemePicker } =
	await import("#lib/components/blocks/theme-picker.svelte");
const { default: ThemeToggle } =
	await import("#lib/components/blocks/theme-toggle.svelte");

describe("ThemePicker", () => {
	afterEach(() => {
		cleanup();
		setMode.mockClear();
	});

	test("checks the saved theme and applies the one picked", async () => {
		const onchange = mock((_theme: string) => undefined);
		const { getByRole } = render(ThemePicker, { value: "light", onchange });
		expect(
			(getByRole("radio", { name: /Light/ }) as HTMLInputElement).checked,
		).toBe(true);
		await fireEvent.click(getByRole("radio", { name: /Dark/ }));
		expect(setMode.mock.calls).toEqual([["dark"]]);
		expect(onchange.mock.calls).toEqual([["dark"]]);
	});

	test("posts as a form field and speaks the app's language", () => {
		const { getByRole, getByText } = render(ThemePicker, {
			name: "appearance-theme",
			messages: { legend: "Thème", dark: "Sombre" },
		});
		expect(getByText("Thème")).toBeTruthy();
		expect(getByRole("radio", { name: /Sombre/ }).getAttribute("name")).toBe(
			"appearance-theme",
		);
	});
});

describe("ThemeToggle", () => {
	afterEach(() => {
		cleanup();
		setMode.mockClear();
	});

	test("presses the current theme and applies the one picked", async () => {
		const onchange = mock((_theme: string) => undefined);
		const { getByRole } = render(ThemeToggle, { onchange });
		expect(getByRole("radio", { name: "System" }).dataset.state).toBe("on");
		await fireEvent.click(getByRole("radio", { name: "Dark" }));
		expect(setMode.mock.calls).toEqual([["dark"]]);
		expect(onchange.mock.calls).toEqual([["dark"]]);
		expect(getByRole("radio", { name: "Dark" }).dataset.state).toBe("on");
	});

	test("ignores a click on the theme already on", async () => {
		const { getByRole } = render(ThemeToggle, { value: "light" });
		await fireEvent.click(getByRole("radio", { name: "Light" }));
		expect(setMode).not.toHaveBeenCalled();
		expect(getByRole("radio", { name: "Light" }).dataset.state).toBe("on");
	});
});
