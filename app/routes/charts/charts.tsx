import { useTranslation } from "react-i18next";
import Page from "~/components/Page/Page";
import i18n from "~/i18n/i18n";
import type { Route } from "./+types/charts";
import styles from "./charts.module.scss";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: i18n.t("charts.title") },
		{ name: "description", content: i18n.t("charts.description") },
	];
}

export default function Charts() {
	const { t } = useTranslation()

	return (
		<Page className={styles.charts}>
			<h1 className={styles.header}>{t("common.comingSoon")}</h1>
		</Page>
	)
}
