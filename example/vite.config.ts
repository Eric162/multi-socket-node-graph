import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
	plugins: [sveltekit()],

	server: {
		fs: {
			allow: [
				// https://vitejs.dev/config/#server-fs-allow
				'..',
			],
		},
	},
});
