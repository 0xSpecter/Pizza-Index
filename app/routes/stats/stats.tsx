import { useTranslation } from "react-i18next";
import Page from "~/components/Page/Page";
import i18n from "~/i18n/i18n";
import type { Route } from "./+types/stats";
import styles from "./stats.module.scss";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: i18n.t("stats.title") },
		{ name: "description", content: i18n.t("stats.description") },
	];
}

export default function Stats() {
	const { t } = useTranslation()

	return (
		<Page className={styles.stats}>
			<h1 className={styles.header}>{t("common.comingSoon")}</h1>
		</Page>
	)
}
