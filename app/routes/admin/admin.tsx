import Page from "~/components/Page/Page";
import type { Route } from "./+types/admin";
import styles from "./admin.module.scss";
import { useAdmin } from "~/hooks/useAdmin";
import { usePizzas, useRoommates } from "~/firebase/queries";
import { useAddRoommate, useRemovePizza, useRemoveRoommate } from "~/firebase/mutations";
import { useRef, useState } from "react";
import { Navigate } from "react-router";
import Button from "~/components/Button/Button";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Pizzaindex admin" },
		{ name: "description", content: "Admin page for fixing db related stuff" },
	];
}

export default function Admin() {
	const { authed, loading: authLoading, logout } = useAdmin()
	const { data: roommates, isLoading: roommatesLoading } = useRoommates()
	const { data: pizzas, isLoading: pizzasLoading } = usePizzas()
	const { mutate: addRoommate, isPending: addingRoommate } = useAddRoommate()
	const { mutate: removeRoommate } = useRemoveRoommate()
	const { mutate: removePizza } = useRemovePizza()

	const [adding, setAdding] = useState(false)
	const nameRef = useRef<HTMLInputElement | null>(null)

	if (!authLoading && !authed) {
		return <Navigate to="/admin/login" replace />
	}

	function submitRoommate() {
		const name = nameRef.current?.value.trim()
		if (!name) return
		addRoommate(name, {
			onSuccess: () => {
				setAdding(false)
			},
		})
	}

	const pizzaRows = (pizzas ?? [])
		.slice()
		.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())

	return (
		<Page className={styles.admin}>
			<div className={styles.container}>
				<div className={styles.roommates}>
					<h1 className={styles.header}>
						Roommates
					</h1>

					{roommatesLoading && <p className={styles.empty}>Loading...</p>}
					{!roommatesLoading && roommates?.length === 0 && (
						<p className={styles.empty}>No roommates yet</p>
					)}

					<ul className={styles.roommateList}>
						{roommates?.map((roommate) => (
							<li key={roommate.name} className={styles.roommateItem}>
								<span>{roommate.name}</span>
								<button
									type="button"
									className={styles.remove}
									onClick={() => window.confirm(`Remove ${roommate.name}?`) && removeRoommate(roommate.name)}
									aria-label={`Remove ${roommate.name}`}
								>
									×
								</button>
							</li>
						))}
					</ul>

					{adding ? (
						<div className={styles.addRoommateForm}>
							<input
								ref={nameRef}
								className={styles.roommateInput}
								placeholder="Name"
								onKeyDown={(e) => e.key === "Enter" && submitRoommate()}
								autoFocus
							/>
							<Button size="sm" onClick={submitRoommate} disabled={addingRoommate}>
								Add
							</Button>
							<Button size="sm" onClick={() => setAdding(false)}>
								Cancel
							</Button>
						</div>
					) : (
						<div className={styles.contrl} onClick={() => setAdding(true)}>
							<Button size="sm" className={styles.logout} onClick={logout}>
								Log out
							</Button>
							<span className={styles.add}>+</span>
						</div>
					)}
				</div>
				<div className={styles.pizzas}>
					{pizzaRows.length === 0 && !pizzasLoading ? (
						<p className={styles.empty}>No pizzas logged yet</p>
					) : (
						<table className={styles.pizzaTable}>
							<thead>
								<tr>
									<th>Roommate</th>
									<th>Brand</th>
									<th>Type</th>
									<th>Price</th>
									<th>Grams</th>
									<th>Discounted</th>
									<th>Created At</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{pizzaRows.map((pizza) => (
									<tr key={pizza.id}>
										<td>{pizza.roommate}</td>
										<td>{pizza.brand ?? "-"}</td>
										<td>{pizza.type ?? "-"}</td>
										<td>{pizza.price != null ? `${pizza.price}kr` : "-"}</td>
										<td>{pizza.grams != null ? `${pizza.grams}g` : "-"}</td>
										<td>{pizza.discounted ? "yes" : "no"}</td>
										<td>{pizza.createdAt.toDate().toLocaleDateString()}</td>
										<td>
											<button
												type="button"
												className={styles.remove}
												onClick={() => window.confirm("Remove this pizza?") && removePizza(pizza.id)}
												aria-label="Remove pizza"
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
