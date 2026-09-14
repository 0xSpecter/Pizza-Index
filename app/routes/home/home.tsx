import Page from "~/components/Page/Page";
import type { Route } from "./+types/home";
import styles from "./home.module.scss";
import PizzaStack from "~/components/PizzaStack/PizzaStack";
import { usePizzas } from "~/firebase/queries";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Pizzaindex" },
		{ name: "description", content: "A index of how many frozen pizzas are consumed where i live" },
	];
}

export default function Home() {
	const { data: pizzas } = usePizzas()
	return (
		<Page className={styles.home}>
			<h1 className={styles.header}>Pizza Index</h1>
			{pizzas &&
				<>
					<PizzaStack count={pizzas.length} />
					<p className={styles.explanation}>
						{pizzas.length} pizzas have been eaten this week
					</p>
				</>
			}
		</Page>
	)
}
