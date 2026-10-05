import Page from "~/components/Page/Page";
import type { Route } from "./+types/home";
import styles from "./home.module.scss";
import PizzaStack from "~/components/PizzaStack/PizzaStack";
import { usePizzas } from "~/firebase/queries";
import { pizzaSize, type Pizza } from "~/firebase/types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import i18n from "~/i18n/i18n";
import { addDays, startOfWeek } from "~/utils/dates";

const MAX_STACK = 30;

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: i18n.t("home.title") },
		{ name: "description", content: i18n.t("home.description") },
	];
}

function getStats(pizzas: Pizza[]) {
	const thisWeekStart = startOfWeek(new Date());

	const lastWeekStart = addDays(thisWeekStart, -7);

	const countSince = (start: Date) =>
		pizzas.filter((pizza) => pizza.createdAt.toMillis() >= start.getTime()).length;
	const thisWeek = countSince(thisWeekStart);
	const lastWeek = countSince(lastWeekStart) - thisWeek;

	const favouriteSize = pizzaSize
		.map((size) => ({ size, count: pizzas.filter((pizza) => pizza.size === size).length }))
		.sort((a, b) => b.count - a.count)[0];

	return {
		favouriteSize,
		thisWeek,
		lastWeek,
		total: pizzas.length,
	};
}

export default function Home() {
	const { t } = useTranslation()
	const { data: pizzas, isLoading, isError } = usePizzas()

	if (isLoading || isError || !pizzas) {
		return (
			<Page className={styles.home}>
				<h1 className={styles.header}>{t("home.header")}</h1>
				<p className={styles.muted} role={isError ? "alert" : undefined}>
					{isError ? t("admin.loadFailed") : t("common.loading")}
				</p>
			</Page>
		)
	}

	if (pizzas.length === 0) {
		return (
			<Page className={styles.home}>
				<h1 className={styles.header}>{t("home.header")}</h1>
				<p className={styles.muted}>{t("admin.noPizzas")}</p>
				<Link to="/add" className={styles.cta}>{t("navbar.addPizza")}</Link>
			</Page>
		)
	}

	const { favouriteSize, thisWeek, lastWeek, total } = getStats(pizzas)
	const difference = thisWeek - lastWeek

	return (
		<Page className={styles.home}>
			<h1 className={styles.header}>{t("home.header")}</h1>

			<section className={styles.hero}>
				<PizzaStack count={Math.min(thisWeek, MAX_STACK)} />
				<div className={styles.heroText}>
					<p className={styles.explanation}>
						{t("home.eaten", { count: thisWeek })}
					</p>
					<p className={styles.muted}>
						{difference > 0 && t("home.more", { count: difference })}
						{difference < 0 && t("home.fewer", { count: -difference })}
						{difference === 0 && t("home.same")}
					</p>
				</div>
			</section>
			<section className={styles.addPizza}>
				<Link to="/add" className={styles.cta}>{t("navbar.addPizza")}</Link>
			</section>
		</Page>
	)
}
