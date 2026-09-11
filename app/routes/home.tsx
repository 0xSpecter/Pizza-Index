import Page from "~/components/Page/Page";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Pizzaindex" },
		{ name: "description", content: "A index of how many frozen pizzas are consumed where i live" },
	];
}

export default function Home() {
	return (
		<Page>
			Pizza Index
		</Page>
	)
}
