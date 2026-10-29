import { afterEach, describe, expect, mock, test } from "bun:test";

import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { flushSync } from "svelte";

import FileDropzone from "#lib/components/kit/file-dropzone.svelte";
import {
	accepts,
	displaySize,
	filesIn,
	rejectionOf,
} from "#lib/components/kit/file-dropzone/files.js";

function file(name: string, type: string, size = 10) {
	return new File(["x".repeat(size)], name, { type });
}

describe("file helpers", () => {
	test("displaySize reads bytes, kilobytes and megabytes", () => {
		expect(displaySize(512)).toBe("512 B");
		expect(displaySize(2048)).toBe("2 KB");
		expect(displaySize(10 * 1024 * 1024)).toBe("10 MB");
		expect(displaySize(1.5 * 1024 * 1024 * 1024)).toBe("1.5 GB");
	});

	test("accepts matches extensions, wildcards and exact types", () => {
		const pdf = file("report.PDF", "application/pdf");
		const photo = file("photo.jpg", "image/jpeg");
		expect(accepts(pdf, ".pdf")).toBe(true);
		expect(accepts(photo, "image/*")).toBe(true);
		expect(accepts(photo, "application/pdf, .png")).toBe(false);
		expect(accepts(photo, undefined)).toBe(true);
	});

	test("rejectionOf says why a file can't be added", () => {
		const limits = { accept: "image/*", maxFiles: 2, maxFileSize: 100 };
		expect(rejectionOf(file("a.png", "image/png"), 1, limits)).toBeUndefined();
		expect(rejectionOf(file("b.png", "image/png"), 3, limits)).toBe("too-many");
		expect(rejectionOf(file("c.png", "image/png", 200), 1, limits)).toBe(
			"too-large",
		);
		expect(rejectionOf(file("d.txt", "text/plain"), 1, limits)).toBe("type");
	});
});

function fileEntry(name: string, path: string) {
	return {
		isFile: true,
		isDirectory: false,
		fullPath: path,
		file: (done: (found: File) => void) => done(file(name, "text/plain")),
	} as unknown as FileSystemEntry;
}

function folderEntry(path: string, children: FileSystemEntry[]) {
	let read = false;
	return {
		isFile: false,
		isDirectory: true,
		fullPath: path,
		createReader: () => ({
			readEntries: (done: (entries: FileSystemEntry[]) => void) => {
				done(read ? [] : children);
				read = true;
			},
		}),
	} as unknown as FileSystemEntry;
}

describe("filesIn", () => {
	test("collects every file under a folder with its path", async () => {
		const folder = folderEntry("/docs", [
			fileEntry("a.txt", "/docs/a.txt"),
			folderEntry("/docs/sub", [fileEntry("b.txt", "/docs/sub/b.txt")]),
		]);
		const found = await filesIn(folder);
		expect(found.map((each) => each.webkitRelativePath)).toEqual([
			"docs/a.txt",
			"docs/sub/b.txt",
		]);
	});
});

describe("FileDropzone", () => {
	afterEach(() => cleanup());

	function pick(input: HTMLInputElement, files: File[]) {
		Object.defineProperty(input, "files", {
			configurable: true,
			writable: true,
			value: files,
		});
		fireEvent.change(input);
		flushSync();
	}

	test("lists picked files, rejects the rest and removes on demand", () => {
		const onreject = mock((_rejected: { file: File; reason: string }) => {});
		const onfiles = mock((_added: File[]) => {});
		const { container, getByText, getByRole, queryByText } = render(
			FileDropzone,
			{
				label: "Attachments",
				name: "attachments",
				accept: "image/*",
				maxFiles: 2,
				onfiles,
				onreject,
			},
		);
		const input = container.querySelector(
			'input[name="attachments"]',
		) as HTMLInputElement;
		expect(getByText("Attachments").getAttribute("for")).toBe(input.id);
		expect(getByText("Up to 2 files")).toBeTruthy();
		pick(input, [
			file("one.png", "image/png"),
			file("notes.txt", "text/plain"),
		]);
		expect(getByText("one.png")).toBeTruthy();
		expect(onfiles.mock.calls[0]?.[0].map((added) => added.name)).toEqual([
			"one.png",
		]);
		expect(onreject.mock.calls[0]?.[0].reason).toBe("type");
		fireEvent.click(getByRole("button", { name: "Remove one.png" }));
		flushSync();
		expect(queryByText("one.png") === null).toBe(true);
	});

	test("shows its error and marks the input invalid", () => {
		const { container, getByText } = render(FileDropzone, {
			label: "Attachments",
			error: "Add at least one file.",
		});
		const input = container.querySelector("input") as HTMLInputElement;
		expect(getByText("Add at least one file.")).toBeTruthy();
		expect(input.getAttribute("aria-invalid")).toBe("true");
		expect(input.getAttribute("aria-describedby")).toBe(`${input.id}-error`);
	});

	test("stops taking files once full", () => {
		const { container } = render(FileDropzone, {
			maxFiles: 1,
			files: [file("only.png", "image/png")],
		});
		expect(
			(container.querySelector('input[type="file"]') as HTMLInputElement)
				.disabled,
		).toBe(true);
	});

	test("lights up while dragging and takes dropped files and folders", async () => {
		const onfiles = mock((_added: File[]) => {});
		const { container, getByText } = render(FileDropzone, {
			label: "Attachments",
			folders: true,
			onfiles,
		});
		const zone = container.querySelector(
			"label[for]:not([data-slot])",
		) as HTMLElement;
		await fireEvent.dragEnter(zone);
		expect(zone.dataset.dragging).toBe("true");
		await fireEvent.drop(zone, {
			dataTransfer: { items: [], files: [file("drop.png", "image/png")] },
		});
		await fireEvent.drop(zone, {
			dataTransfer: {
				items: [
					{
						webkitGetAsEntry: () =>
							folderEntry("/pics", [fileEntry("c.txt", "/pics/c.txt")]),
					},
				],
				files: [],
			},
		});
		await new Promise((done) => setTimeout(done, 0));
		flushSync();
		expect(zone.dataset.dragging).toBeUndefined();
		expect(getByText("drop.png")).toBeTruthy();
		expect(getByText("pics/c.txt")).toBeTruthy();
		expect(getByText("Or choose a folder")).toBeTruthy();
		expect(onfiles).toHaveBeenCalledTimes(2);
	});
});
