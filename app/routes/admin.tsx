import Page from "~/components/Page/Page";
import type { Route } from "./+types/admin";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Pizzaindex admin" },
		{ name: "description", content: "Admin page for fixing db related stuff" },
	];
}

export default function Home() {
	return (
		<Page>
			Pizza Index Admin
		</Page>
	);
}
