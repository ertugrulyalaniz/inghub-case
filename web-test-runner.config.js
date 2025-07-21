import { playwrightLauncher } from "@web/test-runner-playwright";
import { esbuildPlugin } from "@web/dev-server-esbuild";
import { fromRollup } from "@web/dev-server-rollup";
import rollupAlias from "@rollup/plugin-alias";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const alias = fromRollup(rollupAlias);

export default {
	files: "src/**/*.test.js",
	nodeResolve: true,

	plugins: [
		alias({
			entries: [
				{ find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
				{ find: "@config", replacement: path.resolve(__dirname, "src/config") },
				{
					find: "@components",
					replacement: path.resolve(__dirname, "src/components"),
				},
				{
					find: "@shared",
					replacement: path.resolve(__dirname, "src/components/shared"),
				},
				{ find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
				{
					find: "@services",
					replacement: path.resolve(__dirname, "src/services"),
				},
				{ find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
				{
					find: "@locales",
					replacement: path.resolve(__dirname, "src/locales"),
				},
			],
		}),
		esbuildPlugin({
			js: true,
			target: "es2020",
		}),
	],

	browsers: [
		playwrightLauncher({ product: "chromium" }),
	],

	coverageConfig: {
		report: true,
		reportDir: "coverage",
		threshold: {
			statements: 85,
			branches: 85,
			functions: 85,
			lines: 85,
		},
	},

	testFramework: {
		config: {
			ui: "bdd",
			timeout: 3000,
		},
	},

	browserLogs: false,
};
