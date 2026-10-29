import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, render } from "@testing-library/svelte";

const page: { status: number; error: App.Error | null } = {
	status: 404,
	error: null,
};
mock.module("$app/state", () => ({ page }));

const { default: ErrorPage } =
	await import("#lib/components/blocks/error-page.svelte");

describe("ErrorPage", () => {
	afterEach(() => cleanup());

	test("says the page doesn't exist on a 404 and links home", () => {
		page.status = 404;
		page.error = { message: "Not found", status: 404 };
		const { getByText, getByRole } = render(ErrorPage, { homeHref: "/home" });
		expect(getByText("404")).toBeTruthy();
		expect(getByText("Nothing here")).toBeTruthy();
		expect(getByRole("link").getAttribute("href")).toBe("/home");
	});

	test("shows the error's message and id otherwise, in the app's words", () => {
		page.status = 500;
		page.error = {
			message: "Database is down",
			status: 500,
			errorId: "abc123",
		};
		const { getByText } = render(ErrorPage, {
			homeHref: "/",
			messages: { errorTitle: "Ça a planté", errorId: "Erreur" },
		});
		expect(getByText("Ça a planté")).toBeTruthy();
		expect(getByText("Database is down")).toBeTruthy();
		expect(getByText("Erreur: abc123")).toBeTruthy();
		expect(getByText("Back home")).toBeTruthy();
	});
});
