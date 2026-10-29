import { mock } from "bun:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { plugin } from "bun";
import { compile, compileModule } from "svelte/compiler";

GlobalRegistrator.register();

const require = createRequire(import.meta.url);
const svelteClientEntry = join(
	dirname(require.resolve("svelte/package.json")),
	"src/index-client.js",
);
mock.module("svelte", async () => await import(svelteClientEntry));
mock.module("$app/paths", () => ({
	asset: (path: string) => `/${path}`,
	base: "",
	resolve: (path: string) =>
		(path.startsWith("/") ? path : `/${path}`).replaceAll(/\/\([^)]+\)/g, "") ||
		"/",
}));

mock.module("$app/env", () => ({
	browser: false,
	building: false,
	dev: false,
	version: "test",
}));

const typescript = new Bun.Transpiler({ loader: "ts" });

function bareFilePath(path: string): string {
	return path.slice(0, path.includes("?") ? path.indexOf("?") : path.length);
}

plugin({
	name: "svelte loader",
	setup(builder) {
		builder.onLoad(
			{ filter: /(?<!\.svelte\.(js|ts))\.svelte(\?[^.]+)?$/ },
			({ path }) => {
				try {
					const source = readFileSync(bareFilePath(path), "utf-8");
					const result = compile(source, {
						dev: false,
						filename: path,
						generate: "client",
					});
					return { contents: result.js.code, loader: "js" };
				} catch (err) {
					if (err instanceof Error) {
						throw new Error(
							`Failed to compile Svelte component: ${err.message}`,
						);
					}
					throw new Error(`Failed to compile Svelte component: ${String(err)}`);
				}
			},
		);
		builder.onLoad({ filter: /\.svelte\.(js|ts)(\?[^.]+)?$/ }, ({ path }) => {
			try {
				const source = typescript.transformSync(
					readFileSync(bareFilePath(path), "utf-8"),
				);
				const result = compileModule(source, { filename: path });
				return { contents: result.js.code, loader: "js" };
			} catch (err) {
				if (err instanceof Error) {
					throw new Error(`Failed to compile Svelte module: ${err.message}`);
				}
				throw new Error(`Failed to compile Svelte module: ${String(err)}`);
			}
		});
	},
});
