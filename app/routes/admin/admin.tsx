import Page from "~/components/Page/Page";
import type { Route } from "./+types/admin";
import styles from "./admin.module.scss";
import { useAdmin } from "~/hooks/useAdmin";
import { usePizzas, useRoommates } from "~/firebase/queries";
import { useAddRoommate, useRemovePizza, useRemoveRoommate } from "~/firebase/mutations";
import { useState, type FormEvent } from "react";
import { Navigate } from "react-router";
import Button from "~/components/Button/Button";
import { useTranslation } from "react-i18next";
import i18n from "~/i18n/i18n";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: i18n.t("admin.title") },
		{ name: "description", content: i18n.t("admin.description") },
	];
}

export default function Admin() {
	const { t } = useTranslation()
	const { authed, loading } = useAdmin()

	if (loading) {
		return (
			<Page className={styles.admin}>
				<p className={styles.empty}>{t("common.loading")}</p>
			</Page>
		)
	}

	if (!authed) {
		return <Navigate to="/admin/login" replace />
	}

	return <AdminContent />
}

function AdminContent() {
	const { t, i18n } = useTranslation()
	const { logout } = useAdmin()
	const { data: roommates } = useRoommates()
	const { data: pizzas, isLoading: pizzasLoading, isError: pizzasError } = usePizzas()
	const { mutate: addRoommate, isPending: addingRoommate } = useAddRoommate()
	const {
		mutate: removeRoommate,
		isPending: removingRoommate,
		variables: removingRoommateName,
	} = useRemoveRoommate()
	const {
		mutate: removePizza,
		isPending: removingPizza,
		variables: removingPizzaId,
	} = useRemovePizza()

	const [adding, setAdding] = useState(false)
	const [name, setName] = useState("")
	const [error, setError] = useState("")

	function closeForm() {
		setAdding(false)
		setName("")
		setError("")
	}

	function submitRoommate(event: FormEvent) {
		event.preventDefault()
		const trimmed = name.trim()
		if (!trimmed) return

		// Roommates are stored under their lowercased name, so a clash would overwrite.
		const exists = roommates.some((roommate) => roommate.name.toLowerCase() === trimmed.toLowerCase())
		if (exists) {
			setError(t("admin.exists", { name: trimmed }))
			return
		}

		addRoommate(trimmed, {
			onSuccess: closeForm,
			onError: () => setError(t("admin.addFailed")),
		})
	}

	function confirmRemoveRoommate(roommateName: string) {
		const count = pizzaCounts.get(roommateName) ?? 0
		const message = count > 0
			? t("admin.removeConfirmWithPizzas", { name: roommateName, count })
			: t("admin.removeConfirm", { name: roommateName })
		if (!window.confirm(message)) return
		removeRoommate(roommateName, {
			onError: () => setError(t("admin.removeFailed", { name: roommateName })),
		})
	}

	function confirmRemovePizza(pizzaId: string) {
		if (!window.confirm(t("admin.removePizzaConfirm"))) return
		removePizza(pizzaId, {
			onError: () => setError(t("admin.removePizzaFailed")),
		})
	}

	const pizzaRows = (pizzas ?? [])
		.slice()
		.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())

	const pizzaCounts = new Map<string, number>()
	for (const pizza of pizzaRows) {
		pizzaCounts.set(pizza.roommate, (pizzaCounts.get(pizza.roommate) ?? 0) + 1)
	}

	return (
		<Page className={styles.admin}>
			<div className={styles.container}>
				<div className={styles.roommates}>
					<h1 className={styles.header}>
						{t("pizza.roommates")}
					</h1>

					{roommates.length === 0 && (
						<p className={styles.empty}>{t("admin.noRoommates")}</p>
					)}

					<ul className={styles.roommateList}>
						{roommates.map((roommate) => (
							<li key={roommate.name} className={styles.roommateItem}>
								<span>{roommate.name}</span>
								<span className={styles.count}>{pizzaCounts.get(roommate.name) ?? 0}</span>
								<button
									type="button"
									className={styles.remove}
									onClick={() => confirmRemoveRoommate(roommate.name)}
									disabled={removingRoommate && removingRoommateName === roommate.name}
									aria-label={t("admin.removeRoommate", { name: roommate.name })}
								>
									×
								</button>
							</li>
						))}
					</ul>

					{error && <p className={styles.error} role="alert">{error}</p>}

					{adding ? (
						<form className={styles.addRoommateForm} onSubmit={submitRoommate}>
							<input
								className={styles.roommateInput}
								placeholder={t("common.name")}
								aria-label={t("admin.roommateName")}
								value={name}
								onChange={(e) => {
									setName(e.target.value)
									setError("")
								}}
								onKeyDown={(e) => e.key === "Escape" && closeForm()}
								autoFocus
							/>
							<Button size="sm" type="submit" disabled={addingRoommate || !name.trim()}>
								{addingRoommate ? t("pizza.adding") : t("pizza.add")}
							</Button>
							<Button size="sm" onClick={closeForm}>
								{t("common.cancel")}
							</Button>
						</form>
					) : (
						<div className={styles.contrl}>
							<Button size="sm" className={styles.logout} onClick={logout}>
								{t("admin.logout")}
							</Button>
							<button
								type="button"
								className={styles.add}
								onClick={() => setAdding(true)}
								aria-label={t("admin.addRoommate")}
							>
								+
							</button>
						</div>
					)}
				</div>
				<div className={styles.pizzas}>
					{pizzasLoading ? (
						<p className={styles.empty}>{t("common.loading")}</p>
					) : pizzasError ? (
						<p className={styles.error} role="alert">{t("admin.loadFailed")}</p>
					) : pizzaRows.length === 0 ? (
						<p className={styles.empty}>{t("admin.noPizzas")}</p>
					) : (
						<table className={styles.pizzaTable}>
							<thead>
								<tr>
									<th>{t("pizza.roommate")}</th>
									<th>{t("pizza.size")}</th>
									<th>{t("admin.createdAt")}</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{pizzaRows.map((pizza) => (
									<tr key={pizza.id}>
										<td>{pizza.roommate}</td>
										<td>{t(`pizza.sizes.${pizza.size}`)}</td>
										<td>{pizza.createdAt.toDate().toLocaleString(i18n.language, { dateStyle: "medium", timeStyle: "short" })}</td>
										<td>
											<button
												type="button"
												className={styles.remove}
												onClick={() => confirmRemovePizza(pizza.id)}
												disabled={removingPizza && removingPizzaId === pizza.id}
												aria-label={t("admin.removePizza", { name: pizza.roommate, size: t(`pizza.sizes.${pizza.size}`) })}
											>
												×
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</Page>
	);
}
