import { Timestamp } from "firebase/firestore";
import { ADDED_PIZZAS_KEY, PREF_ROOMMATE_KEY, PREF_SIZE_KEY, type CreatePizzaProps, type Pizza, type PizzaSize, type RoommateName } from "./types";

export function setAddPizzaPreferences(pizza: CreatePizzaProps) {
	if (typeof window === "undefined") return;

	window.localStorage.setItem(PREF_ROOMMATE_KEY, pizza.roommate);
	window.localStorage.setItem(PREF_SIZE_KEY, pizza.size);
}

export function getAddPizzaPreferences(): { roommateName?: RoommateName, size?: PizzaSize } {
	if (typeof window === "undefined") return {};

	const roommateName: RoommateName | null = window.localStorage.getItem(PREF_ROOMMATE_KEY);
	const size: PizzaSize | null = window.localStorage.getItem(PREF_SIZE_KEY) as PizzaSize | null;

	return { roommateName: roommateName ? roommateName : undefined, size: size ? size : undefined }
}

export function addToAddedPizzas(pizza: Pizza) {
	if (typeof window === "undefined") return;

	const pizzasString: string | null = window.localStorage.getItem(ADDED_PIZZAS_KEY);
	const pizzas = pizzasString ? JSON.parse(pizzasString) : {}
	pizzas[pizza.id] = pizza

	window.localStorage.setItem(ADDED_PIZZAS_KEY, JSON.stringify(pizzas));
}

export function removePizzaFromAddedPizzas(pizza: Pizza) {
	if (typeof window === "undefined") return;

	const pizzasString: string | null = window.localStorage.getItem(ADDED_PIZZAS_KEY);
	const pizzas: Record<string, Pizza> = pizzasString ? JSON.parse(pizzasString) : null

	if (!pizzas) return;

	delete pizzas[pizza.id]

	window.localStorage.setItem(ADDED_PIZZAS_KEY, JSON.stringify(pizzas));
}

export function getAddedPizzas(): Pizza[] | null {
	if (typeof window === "undefined") return null;

	const pizzasString: string | null = window.localStorage.getItem(ADDED_PIZZAS_KEY);
	const pizzas: Record<string, Pizza> | null = pizzasString ? JSON.parse(pizzasString) : null

	if (!pizzas) return null;

	return Object.values(pizzas).map(pizza => ({
		...pizza,
		createdAt: new Timestamp(pizza.createdAt.seconds, pizza.createdAt.nanoseconds),
	}))
}

export function purgeAddedPizzas() {
	if (typeof window === "undefined") return;

	window.localStorage.removeItem(ADDED_PIZZAS_KEY);
}

export function purgeAddPizzaPreferences() {
	if (typeof window === "undefined") return;

	window.localStorage.removeItem(PREF_ROOMMATE_KEY);
	window.localStorage.removeItem(PREF_SIZE_KEY);
}
