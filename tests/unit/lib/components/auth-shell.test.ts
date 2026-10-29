import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";

import AuthShell from "#lib/components/blocks/auth-shell.svelte";

const snippet = (html: string) =>
	createRawSnippet(() => ({ render: () => html }));

describe("AuthShell", () => {
	afterEach(() => cleanup());

	test("renders the heading, the form, the brand and the footer", () => {
		const { getByRole, getByText, getByTestId } = render(AuthShell, {
			heading: "Sign in",
			subheading: "Welcome back.",
			brand: snippet('<span data-testid="brand"></span>'),
			children: snippet("<form>Fields</form>"),
			footer: snippet("<span>No account?</span>"),
		});
		expect(getByRole("heading", { name: "Sign in" })).toBeTruthy();
		expect(getByText("Welcome back.")).toBeTruthy();
		expect(getByTestId("brand")).toBeTruthy();
		expect(getByText("Fields")).toBeTruthy();
		expect(getByText("No account?")).toBeTruthy();
	});

	test("leaves out what isn't given", () => {
		const { container } = render(AuthShell, {
			heading: "Sign in",
			children: snippet("<form></form>"),
		});
		expect(container.querySelectorAll("p")).toHaveLength(0);
	});
});
