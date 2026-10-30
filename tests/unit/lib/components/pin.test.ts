import { afterEach, describe, expect, spyOn, test } from "bun:test";

import { pinPage } from "#lib/components/ui/drawer/pin.js";

describe("pinPage", () => {
	afterEach(() => {
		document.body.removeAttribute("style");
	});

	test("pins the page at its scroll offset until the last drawer closes, then puts it back", () => {
		const scrollTo = spyOn(window, "scrollTo").mockImplementation(
			() => undefined,
		);
		Object.defineProperty(window, "scrollY", {
			configurable: true,
			value: 640,
		});
		document.body.style.setProperty("left", "4px");
		const unpinOuter = pinPage();
		expect(document.body.style.getPropertyValue("position")).toBe("fixed");
		expect(document.body.style.getPropertyPriority("position")).toBe(
			"important",
		);
		expect(document.body.style.top).toBe("-640px");
		const unpinInner = pinPage();
		unpinInner();
		unpinInner();
		expect(document.body.style.position).toBe("fixed");
		expect(scrollTo).not.toHaveBeenCalled();
		unpinOuter();
		expect(document.body.style.position).toBe("");
		expect(document.body.style.top).toBe("");
		expect(document.body.style.left).toBe("4px");
		expect(scrollTo).toHaveBeenCalledWith(0, 640);
		scrollTo.mockRestore();
	});

	test("waits for the dialog's scroll lock to let go before putting the page back", async () => {
		const scrollTo = spyOn(window, "scrollTo").mockImplementation(
			() => undefined,
		);
		Object.defineProperty(window, "scrollY", {
			configurable: true,
			value: 300,
		});
		const unpin = pinPage();
		document.body.style.overflow = "hidden";
		unpin();
		expect(document.body.style.position).toBe("fixed");
		expect(scrollTo).not.toHaveBeenCalled();
		const again = pinPage();
		again();
		document.body.style.removeProperty("overflow");
		await new Promise((settle) => setTimeout(settle, 20));
		expect(document.body.style.position).toBe("");
		expect(scrollTo).toHaveBeenCalledWith(0, 300);
		scrollTo.mockRestore();
	});

	test("leaves Safari to vaul", () => {
		const original = Object.getOwnPropertyDescriptor(navigator, "userAgent");
		Object.defineProperty(navigator, "userAgent", {
			configurable: true,
			value:
				"Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
		});
		const unpin = pinPage();
		expect(document.body.style.position).toBe("");
		unpin();
		if (original) {
			Object.defineProperty(navigator, "userAgent", original);
		} else {
			delete (navigator as { userAgent?: string }).userAgent;
		}
	});
});
