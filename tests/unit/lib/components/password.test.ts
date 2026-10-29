import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import NewPasswordFields from "#lib/components/blocks/new-password-fields.svelte";
import PasswordInput from "#lib/components/blocks/password-input.svelte";

import WithTooltips from "../../fixtures/with-tooltips.svelte";

describe("PasswordInput", () => {
	afterEach(() => cleanup());

	test("reveals and hides what was typed", async () => {
		const { container, getByRole } = render(WithTooltips, {
			component: PasswordInput,
			innerProps: {
				messages: { show: "Afficher" },
			},
		});
		const input = container.querySelector("input");
		expect(input?.type).toBe("password");
		expect(input?.name).toBe("password");
		expect(input?.autocomplete).toBe("current-password");
		await fireEvent.click(getByRole("button", { name: "Afficher" }));
		expect(input?.type).toBe("text");
		await fireEvent.click(getByRole("button", { name: "Hide password" }));
		expect(input?.type).toBe("password");
	});
});

describe("PasswordInput with a label", () => {
	afterEach(() => cleanup());

	test("wires its label and points the field at its error", () => {
		const { container, getByText } = render(WithTooltips, {
			component: PasswordInput,
			innerProps: { label: "Password", error: "Too short." },
		});
		const input = container.querySelector("input") as HTMLInputElement;
		expect(getByText("Password").getAttribute("for")).toBe(input.id);
		expect(input.getAttribute("aria-invalid")).toBe("true");
		expect(input.getAttribute("aria-describedby")).toBe(`${input.id}-error`);
		expect(getByText("Too short.")).toBeTruthy();
	});

	test("renders no frame without a label, for Input to frame it", () => {
		const { container } = render(WithTooltips, {
			component: PasswordInput,
			innerProps: { id: "framed-elsewhere" },
		});
		expect(container.querySelector('[data-slot="field"]') === null).toBe(true);
		expect(container.querySelector("input")?.id).toBe("framed-elsewhere");
	});
});

describe("NewPasswordFields", () => {
	afterEach(() => cleanup());

	test("rates the password, ticks the rules and catches a mismatch", async () => {
		const { container, getByText, getByLabelText } = render(WithTooltips, {
			component: NewPasswordFields,
			innerProps: {
				email: "alex@example.com",
				ruleLabels: { variety: "Trois types de caractères" },
			},
		});
		await fireEvent.input(getByLabelText("Password"), {
			target: { value: "correct-Horse-battery-1" },
		});
		expect(getByText("Strong")).toBeTruthy();
		expect(
			getByText("Trois types de caractères").closest("li")?.className,
		).toContain("text-positive");
		await fireEvent.input(getByLabelText("Type it again"), {
			target: { value: "something else" },
		});
		expect(getByText("The passwords don't match.")).toBeTruthy();
		expect(
			container
				.querySelector("#confirm-password")
				?.getAttribute("aria-invalid"),
		).toBe("true");
	});

	test("shows the server's errors under their field", () => {
		const { getByText } = render(WithTooltips, {
			component: NewPasswordFields,
			innerProps: {
				errors: { password: ["Too common."] },
			},
		});
		expect(getByText("Too common.")).toBeTruthy();
	});
});
