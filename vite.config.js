import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@components": resolve(__dirname, "./src/components"),
			"@shared": resolve(__dirname, "./src/components/shared"),
			"@pages": resolve(__dirname, "./src/pages"),
			"@services": resolve(__dirname, "./src/services"),
			"@utils": resolve(__dirname, "./src/utils"),
			"@styles": resolve(__dirname, "./src/styles"),
			"@config": resolve(__dirname, "./src/config"),
			"@locales": resolve(__dirname, "./src/locales"),
		},
	},
	build: {
		target: "es2020",
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			},
		},
	},
	server: {
		port: 3000,
		open: true,
	},
});
