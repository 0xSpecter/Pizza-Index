import type { Timestamp } from "firebase/firestore";
import { createContext } from "react"

export const PREF_ROOMMATE_KEY = "pref_roommate"
export const PREF_SIZE_KEY = "pref_size"

export const ADDED_PIZZAS_KEY = "added_pizzas"

export type RoommateName = string;
export interface Roommate {
	name: RoommateName,
}

export type PizzaSize = "small" | "medium" | "large";
export const pizzaSize: PizzaSize[] = ["small", "medium", "large"];

export interface Pizza {
	id: string,
	roommate: RoommateName,
	size: PizzaSize,
	createdAt: Timestamp
}

export type CreatePizzaProps = Omit<Pizza, "id" | "createdAt">;

export interface AuthToken {
	createdAt: Timestamp,
	expireAt: Timestamp,
}

export const AUTH_TOKEN_KEY = "auth_token"
export const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export const pizzaKeys = {
	roommates: ["roommates"] as const,
	roommate: (name: string) => ["roommates", name] as const,

	pizzas: ["pizzas"] as const,

	authToken: ['auth'] as const,
};

export interface AdminContextValues {
	authed: boolean,
	token: AuthToken | null | undefined,
	loading: boolean,
	login: (passwordAttempt: string) => Promise<boolean>,
	logout: () => void,
}

export const AdminContext = createContext<AdminContextValues | undefined>(undefined);
