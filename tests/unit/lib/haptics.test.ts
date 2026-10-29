import { afterEach, describe, expect, mock, test } from "bun:test";

import { haptic } from "#lib/haptics.js";

const original = Object.getOwnPropertyDescriptor(globalThis, "navigator");

describe("haptic", () => {
	afterEach(() => {
		if (original) {
			Object.defineProperty(globalThis, "navigator", original);
		}
	});

	test("vibrates with the pattern of its kind", () => {
		const vibrate = mock((_pattern: VibratePattern) => true);
		Object.defineProperty(globalThis, "navigator", {
			configurable: true,
			value: { vibrate },
		});
		haptic("tap");
		haptic("error");
		expect(vibrate.mock.calls).toEqual([[10], [[30, 60, 30]]]);
	});

	test("does nothing where vibration isn't supported", () => {
		Object.defineProperty(globalThis, "navigator", {
			configurable: true,
			value: {},
		});
		expect(() => haptic("success")).not.toThrow();
	});
});
