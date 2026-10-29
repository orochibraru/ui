import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { Dialog } from "bits-ui";
import { flushSync } from "svelte";

let desktop = true;
const reactivity = await import("svelte/reactivity");
mock.module("vaul-svelte", () => ({
	Drawer: { ...Dialog, NestedRoot: Dialog.Root },
}));
mock.module("svelte/reactivity", () => ({
	...reactivity,
	MediaQuery: class {
		get current() {
			return desktop;
		}
	},
}));

const { default: ConfirmDialogPage } =
	await import("../../../fixtures/kit-confirm-dialog-page.svelte");

function setup(props: Record<string, unknown>) {
	const result = render(ConfirmDialogPage, {
		title: "Delete this folder?",
		...props,
	} as never);
	flushSync();
	return result;
}

function isOpen() {
	return screen.getByTestId("open").textContent;
}

async function settle() {
	await Bun.sleep(0);
	flushSync();
}

function deferred() {
	let resolve = () => {};
	let reject = () => {};
	const promise = new Promise<void>((onResolve, onReject) => {
		resolve = onResolve;
		reject = () => onReject(new Error("failed"));
	});
	return { promise, resolve, reject };
}

describe("ConfirmDialog", () => {
	afterEach(() => {
		cleanup();
		desktop = true;
	});

	test("on desktop, an alert dialog with English defaults", () => {
		setup({ description: "Files are removed.", onconfirm: () => {} });
		expect(screen.getByRole("alertdialog")).toBeTruthy();
		expect(screen.getByText("Delete this folder?")).toBeTruthy();
		expect(screen.getByText("Files are removed.")).toBeTruthy();
		expect(screen.getByRole("button", { name: "Cancel" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "Confirm" })).toBeTruthy();
	});

	test("confirming runs the action and closes", async () => {
		const onconfirm = mock(() => {});
		setup({ onconfirm, confirmLabel: "Delete", destructive: true });
		const confirm = screen.getByRole("button", { name: "Delete" });
		expect(confirm.className).toContain("text-destructive");
		await fireEvent.click(confirm);
		flushSync();
		expect(onconfirm).toHaveBeenCalledTimes(1);
		expect(isOpen()).toBe("false");
	});

	test("cancel closes without confirming", async () => {
		const onconfirm = mock(() => {});
		setup({ onconfirm, cancelLabel: "Keep" });
		await fireEvent.click(screen.getByRole("button", { name: "Keep" }));
		flushSync();
		expect(onconfirm).not.toHaveBeenCalled();
		expect(isOpen()).toBe("false");
	});

	test("a promise keeps it open with a spinner until it resolves", async () => {
		const { promise, resolve } = deferred();
		setup({ onconfirm: () => promise });
		await fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
		flushSync();
		expect(screen.getByRole("status", { name: "Working…" })).toBeTruthy();
		expect(
			(screen.getByRole("button", { name: "Cancel" }) as HTMLButtonElement)
				.disabled,
		).toBe(true);
		await fireEvent.keyDown(document.activeElement ?? document.body, {
			key: "Escape",
		});
		flushSync();
		expect(isOpen()).toBe("true");
		resolve();
		await settle();
		expect(isOpen()).toBe("false");
	});

	test("a rejected promise stops the spinner and stays open", async () => {
		const { promise, reject } = deferred();
		setup({ onconfirm: () => promise });
		await fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
		flushSync();
		reject();
		await settle();
		expect(screen.queryByRole("status", { name: "Working…" })).toBeNull();
		expect(isOpen()).toBe("true");
		expect(
			(screen.getByRole("button", { name: "Confirm" }) as HTMLButtonElement)
				.disabled,
		).toBe(false);
	});

	test("on a phone, a drawer with stacked actions and translated copy", async () => {
		desktop = false;
		const onconfirm = mock(() => {});
		setup({
			onconfirm,
			messages: { confirm: "Confirmer", cancel: "Annuler" },
		});
		expect(screen.getByRole("dialog")).toBeTruthy();
		expect(screen.getByRole("button", { name: "Annuler" })).toBeTruthy();
		await fireEvent.click(screen.getByRole("button", { name: "Confirmer" }));
		flushSync();
		expect(onconfirm).toHaveBeenCalledTimes(1);
		expect(isOpen()).toBe("false");
	});
});
