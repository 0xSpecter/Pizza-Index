import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), reactRouter()],
	base: '/Pizza-Index/',
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		port: 3000,
	},
});
