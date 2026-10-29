import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";

import OtpField from "#lib/components/blocks/otp-field.svelte";

describe("OtpField", () => {
	afterEach(() => cleanup());

	test("takes digits only, posts as one field and reports a full code", async () => {
		const oncomplete = mock((_code: string) => undefined);
		const { container } = render(OtpField, { id: "code", oncomplete });
		const input = container.querySelector("input");
		expect(input?.name).toBe("code");
		expect(input?.id).toBe("code");
		expect(input?.getAttribute("autocomplete")).toBe("one-time-code");
		expect(input?.getAttribute("inputmode")).toBe("numeric");
		await fireEvent.input(input as HTMLInputElement, {
			target: { value: "123456" },
		});
		expect(oncomplete.mock.calls).toEqual([["123456"]]);
		expect(
			container.querySelectorAll('[data-slot="input-otp-slot"]'),
		).toHaveLength(6);
	});
});
