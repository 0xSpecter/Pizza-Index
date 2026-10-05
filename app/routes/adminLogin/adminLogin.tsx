import Page from "~/components/Page/Page";
import type { Route } from "./+types/adminLogin";
import styles from "./adminLogin.module.scss";
import { useAdmin } from "~/hooks/useAdmin";
import Button from "~/components/Button/Button";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import i18n from "~/i18n/i18n";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: i18n.t("admin.title") },
		{ name: "description", content: i18n.t("login.description") },
	];
}

export default function AdminLogin() {
	const { t } = useTranslation()
	const { authed, loading, login } = useAdmin()
	const navigate = useNavigate()
	const ref = useRef<HTMLInputElement | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [submitting, setSubmitting] = useState(false)

	if (!loading && authed) {
		return <Navigate to="/admin" replace />
	}

	async function submit() {
		if (!ref.current) {
			setError("no ref for input")
			return
		};

		setSubmitting(true)
		const success = await login(ref.current.value)
		setSubmitting(false)
		console.log(success)

		if (!success) {
			setError(t("login.invalid"))
			return
		};

		navigate("/admin")
	}

	return (
		<Page className={styles.admin}>
			<div className={styles.container}>
				<input className={styles.password}
					type="password"
					aria-label={t("login.password")}
					ref={ref}
					onKeyDown={(e) => e.key === "Enter" && submit()}
				/>
				<span className={styles.error}>
					{error ? error : ""}
				</span>
				<Button onClick={submit} disabled={submitting}>
					{t("login.submit")}
				</Button >
			</div>
		</Page>
	);
}
