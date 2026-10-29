import { afterEach, describe, expect, test } from "bun:test";

import { cleanup, render } from "@testing-library/svelte";

import StatusBadge from "#lib/components/kit/status-badge.svelte";

const tones = { running: "positive", failed: "negative" } as const;

describe("StatusBadge", () => {
	afterEach(() => cleanup());

	test("takes its tone and label from the maps", () => {
		const { getByText } = render(StatusBadge, {
			status: "failed",
			tones,
			labels: { failed: "Échec" },
		});
		const badge = getByText("Échec");
		expect(badge.dataset.tone).toBe("negative");
		expect(badge.className).toContain("text-negative");
	});

	test("falls back to the status and a neutral tone, pulsing when live", () => {
		const { getByText, container } = render(StatusBadge, {
			status: "deploying",
			tones,
			pulse: true,
		});
		expect(getByText("deploying").dataset.tone).toBe("neutral");
		expect(container.querySelector(".motion-safe\\:animate-ping")).toBeTruthy();
	});
});
