import Page from "~/components/Page/Page";
import type { Route } from "./+types/adminLogin";
import styles from "./adminLogin.module.scss";
import { useAdmin } from "~/hooks/useAdmin";
import Button from "~/components/Button/Button";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Pizzaindex admin" },
		{ name: "description", content: "Password check" },
	];
}

export default function AdminLogin() {
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
			setError("Invalid password")
			return
		};

		navigate("/admin")
	}

	return (
		<Page className={styles.admin}>
			<div className={styles.container}>
				<input className={styles.password}
					type="password"
					ref={ref}
					onKeyDown={(e) => e.key === "Enter" && submit()}
				/>
				<span className={styles.error}>
					{error ? error : ""}
				</span>
				<Button onClick={submit} disabled={submitting}>
					Submit
				</Button >
			</div>
		</Page>
	);
}
