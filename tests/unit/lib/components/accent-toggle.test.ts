import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import AccentToggle from "#lib/components/blocks/accent-toggle.svelte";

describe("AccentToggle", () => {
	afterEach(() => {
		cleanup();
		delete document.documentElement.dataset.accent;
	});

	test("presses the saved accent and applies the one picked", async () => {
		const onchange = mock((_accent: string) => undefined);
		const { getByRole } = render(AccentToggle, { value: "green", onchange });
		expect(getByRole("radio", { name: "Green" }).dataset.state).toBe("on");
		await fireEvent.click(getByRole("radio", { name: "Rose" }));
		expect(document.documentElement.dataset.accent).toBe("rose");
		expect(onchange.mock.calls).toEqual([["rose"]]);
		expect(getByRole("radio", { name: "Rose" }).dataset.state).toBe("on");
	});

	test("ignores a click on the accent already on, and speaks the app's language", async () => {
		const onchange = mock((_accent: string) => undefined);
		const { getByRole } = render(AccentToggle, {
			onchange,
			messages: { bordeaux: "Lie-de-vin" },
		});
		await fireEvent.click(getByRole("radio", { name: "Lie-de-vin" }));
		expect(onchange).not.toHaveBeenCalled();
		expect(getByRole("radio", { name: "Lie-de-vin" }).dataset.state).toBe("on");
	});
});
