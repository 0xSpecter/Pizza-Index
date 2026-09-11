import { type RouteConfig, index, layout, prefix } from "@react-router/dev/routes";

export default [
	layout("layouts/layout.tsx", [
		index("routes/home.tsx"),
		...prefix("admin", [
			index("routes/admin.tsx")
		]),
	]),
] satisfies RouteConfig;
