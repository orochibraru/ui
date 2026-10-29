import { afterEach, describe, expect, mock, test } from "bun:test";

import UsersIcon from "@lucide/svelte/icons/users";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

import StepperPage from "../../fixtures/stepper-page.svelte";

const steps = [
	{ label: "Basics", description: "Name it." },
	{ label: "Team", icon: UsersIcon },
	{ label: "Review" },
];

function stepButtons(
	getAllByRole: ReturnType<typeof render>["getAllByRole"],
	name: string,
) {
	return getAllByRole("button", { name }) as HTMLButtonElement[];
}

describe("Stepper", () => {
	afterEach(() => cleanup());

	test("advances to the next step and says where it is", async () => {
		const { getByRole, getByTestId, getByText, getAllByRole } = render(
			StepperPage,
			{ steps },
		);
		expect(getByText("Step 1 of 3")).toBeTruthy();
		expect(getByText("Name it.")).toBeTruthy();
		expect(getByText(/Next:\s+Team/)).toBeTruthy();
		await fireEvent.click(getByRole("button", { name: "Next" }));
		expect(getByTestId("active").textContent).toBe("1");
		expect(getByText("Step 2 of 3")).toBeTruthy();
		for (const button of stepButtons(getAllByRole, "Step 2: Team")) {
			expect(button.getAttribute("aria-current")).toBe("step");
		}
		expect(getByText("Panel Team").hidden).toBe(false);
		expect(getByText("Panel Basics").hidden).toBe(true);
	});

	test("stays on the step when onnext refuses it", async () => {
		const onnext = mock((_step: number) => false);
		const { getByRole, getByTestId } = render(StepperPage, { steps, onnext });
		await fireEvent.click(getByRole("button", { name: "Next" }));
		expect(onnext.mock.calls).toEqual([[0]]);
		expect(getByTestId("active").textContent).toBe("0");
	});

	test("never jumps ahead of the furthest step reached", async () => {
		const { getByRole, getByTestId, getAllByRole } = render(StepperPage, {
			steps,
		});
		for (const button of stepButtons(getAllByRole, "Step 3: Review")) {
			expect(button.disabled).toBe(true);
			await fireEvent.click(button);
		}
		expect(getByTestId("active").textContent).toBe("0");
		await fireEvent.click(getByRole("button", { name: "Next" }));
		for (const button of stepButtons(getAllByRole, "Step 1: Basics")) {
			await fireEvent.click(button);
			expect(getByTestId("active").textContent).toBe("0");
		}
		for (const button of stepButtons(getAllByRole, "Step 3: Review")) {
			expect(button.disabled).toBe(true);
		}
		for (const button of stepButtons(getAllByRole, "Step 2: Team")) {
			expect(button.disabled).toBe(false);
			await fireEvent.click(button);
			expect(getByTestId("active").textContent).toBe("1");
		}
	});

	test("goes back a step", async () => {
		const { getByRole, getByTestId, queryByRole } = render(StepperPage, {
			steps,
		});
		expect(queryByRole("button", { name: "Back" })).toBeNull();
		await fireEvent.click(getByRole("button", { name: "Next" }));
		await fireEvent.click(getByRole("button", { name: "Back" }));
		expect(getByTestId("active").textContent).toBe("0");
	});

	test("shows the finish button instead of Next on the last step", async () => {
		const { getByRole, queryByRole, queryByText } = render(StepperPage, {
			steps,
		});
		expect(queryByRole("button", { name: "Finish" })).toBeNull();
		await fireEvent.click(getByRole("button", { name: "Next" }));
		await fireEvent.click(getByRole("button", { name: "Next" }));
		expect(getByRole("button", { name: "Finish" })).toBeTruthy();
		expect(queryByRole("button", { name: "Next" })).toBeNull();
		expect(queryByText(/Next:/)).toBeNull();
	});

	test("takes translated messages", async () => {
		const { getByRole, getByText, getAllByRole } = render(StepperPage, {
			steps,
			messages: {
				next: "Suivant",
				back: "Retour",
				upNext: "Ensuite :",
				progress: (step: number, total: number) => `Étape ${step} sur ${total}`,
				stepLabel: (step: number, label: string) => `Étape ${step} : ${label}`,
			},
		});
		expect(getByText("Étape 1 sur 3")).toBeTruthy();
		expect(getByText(/Ensuite :/)).toBeTruthy();
		expect(stepButtons(getAllByRole, "Étape 1 : Basics")).toHaveLength(2);
		await fireEvent.click(getByRole("button", { name: "Suivant" }));
		expect(getByRole("button", { name: "Retour" })).toBeTruthy();
	});
});
