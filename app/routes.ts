import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	layout("layouts/layout.tsx", [
		index("routes/home/home.tsx"),
		route("add", "routes/add/add.tsx"),
		...prefix("admin", [
			index("routes/admin/admin.tsx")
		]),
	]),
] satisfies RouteConfig;
