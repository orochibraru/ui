export type FileRejection = "too-large" | "too-many" | "type";

export interface FileLimits {
	accept?: string;
	maxFiles?: number;
	maxFileSize?: number;
}

const KILOBYTE = 1024;
const MEGABYTE = 1024 * KILOBYTE;
const GIGABYTE = 1024 * MEGABYTE;

/** A byte count as a short size, like 12 KB or 3.4 MB. */
export function displaySize(bytes: number): string {
	if (bytes < KILOBYTE) {
		return `${bytes} B`;
	}
	if (bytes < MEGABYTE) {
		return `${Math.round(bytes / KILOBYTE)} KB`;
	}
	if (bytes < GIGABYTE) {
		return `${(bytes / MEGABYTE).toFixed(1).replace(/\.0$/, "")} MB`;
	}
	return `${(bytes / GIGABYTE).toFixed(1).replace(/\.0$/, "")} GB`;
}

/** Whether `file` matches an `accept` list of extensions (`.pdf`), wildcards (`image/*`) and types (`text/csv`). */
export function accepts(file: File, accept: string | undefined): boolean {
	if (!accept) {
		return true;
	}
	const type = file.type.toLowerCase();
	const name = file.name.toLowerCase();
	return accept
		.split(",")
		.map((pattern) => pattern.trim().toLowerCase())
		.some((pattern) => {
			if (pattern.startsWith(".")) {
				return name.endsWith(pattern);
			}
			if (pattern.endsWith("/*")) {
				return type.startsWith(pattern.slice(0, -1));
			}
			return type === pattern;
		});
}

/** Why `file`, the `position`-th file counting the ones already kept, can't be added, or nothing when it can. */
export function rejectionOf(
	file: File,
	position: number,
	limits: FileLimits,
): FileRejection | undefined {
	if (limits.maxFiles !== undefined && position > limits.maxFiles) {
		return "too-many";
	}
	if (limits.maxFileSize !== undefined && file.size > limits.maxFileSize) {
		return "too-large";
	}
	return accepts(file, limits.accept) ? undefined : "type";
}

/** Every file under a dropped folder entry, with its path inside the folder kept as `webkitRelativePath`. */
export async function filesIn(entry: FileSystemEntry): Promise<File[]> {
	if (entry.isFile) {
		const file = await new Promise<File>((resolve, reject) =>
			(entry as FileSystemFileEntry).file(resolve, reject),
		);
		Object.defineProperty(file, "webkitRelativePath", {
			value: entry.fullPath.slice(1),
		});
		return [file];
	}
	if (!entry.isDirectory) {
		return [];
	}
	const reader = (entry as FileSystemDirectoryEntry).createReader();
	const children: FileSystemEntry[] = [];
	for (;;) {
		const batch = await new Promise<FileSystemEntry[]>((resolve, reject) =>
			reader.readEntries(resolve, reject),
		);
		if (batch.length === 0) {
			break;
		}
		children.push(...batch);
	}
	return (await Promise.all(children.map(filesIn))).flat();
}
