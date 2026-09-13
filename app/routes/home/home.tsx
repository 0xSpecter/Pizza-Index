import Page from "~/components/Page/Page";
import type { Route } from "./+types/home";
import styles from "./home.module.scss";
import PizzaStack from "~/components/PizzaStack/PizzaStack";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Pizzaindex" },
		{ name: "description", content: "A index of how many frozen pizzas are consumed where i live" },
	];
}

export default function Home() {
	return (
		<Page className={styles.home}>
			<h1 className={styles.header}>Pizza Index</h1>
			<PizzaStack count={10} />
			<p className={styles.explanation}>
				10 pizzas have been eaten this week
			</p>
		</Page>
	)
}
