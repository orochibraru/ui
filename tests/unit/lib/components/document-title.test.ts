import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, render } from "@testing-library/svelte";
import { flushSync } from "svelte";

import TitledPage from "../../fixtures/titled-page.svelte";

describe("DocumentTitle", () => {
	afterEach(() => cleanup());

	test("suffixes the page title with the app name", () => {
		const { getByTestId } = render(TitledPage, {
			title: "Groups",
			backHref: "/home",
		});
		flushSync();
		expect(document.title).toBe("Groups · Demo");
		expect(getByTestId("back").textContent).toBe("/home");
	});

	test("shows the app name alone, or the title when it already names the app", () => {
		render(TitledPage, { title: "" });
		flushSync();
		expect(document.title).toBe("Demo");
		render(TitledPage, { title: "Welcome to Demo" });
		flushSync();
		expect(document.title).toBe("Welcome to Demo");
	});
});
