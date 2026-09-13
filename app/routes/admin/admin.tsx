import Page from "~/components/Page/Page";
import type { Route } from "./+types/admin";
import styles from "./admin.module.scss";
import { useAdmin } from "~/hooks/useAdmin";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Pizzaindex admin" },
		{ name: "description", content: "Admin page for fixing db related stuff" },
	];
}

export default function Admin() {
	const { login } = useAdmin()

	return (
		<Page className={styles.admin}>
			<div className={styles.container}>
				hello
			</div>
		</Page>
	);
}
