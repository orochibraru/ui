import { describe, expect, test } from "bun:test";

import { passwordRules, passwordScore } from "#lib/password.js";

function failed(password: string, email = ""): string[] {
	return passwordRules(password, email)
		.filter((rule) => !rule.passed)
		.map((rule) => rule.id);
}

describe("passwordRules", () => {
	test("a long password mixing three kinds of characters passes", () => {
		expect(failed("correct-Horse-battery")).toEqual([]);
	});

	test("flags a short, plain or email-based password", () => {
		expect(failed("short")).toEqual(["length", "variety"]);
		expect(failed("alexandre-Secret-1", "alexandre@example.com")).toEqual([
			"email",
		]);
		expect(failed("A1-".repeat(50))).toEqual(["max"]);
	});
});

describe("passwordScore", () => {
	test("rises from nothing to strong", () => {
		expect(passwordScore("")).toBe(0);
		expect(passwordScore("abc")).toBe(1);
		expect(passwordScore("correct-Horse-1")).toBe(3);
		expect(passwordScore("correct-Horse-battery-1")).toBe(4);
	});
});
