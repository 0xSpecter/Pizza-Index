import type { Timestamp } from "firebase/firestore";
import { createContext } from "react"

export interface Roommate {
	name: string,
	pizzas: Pizza[],
}

export interface Pizza {
	id: string,
	type?: string;
	brand?: string;
	price?: number;
	grams?: number;
	discounted?: boolean;
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
	all: ["roommates"] as const,
	roommate: (name: string) => ["roommates", name] as const,

	authToken: ['auth'] as const,
};

export interface AdminContextValues {
	authed: boolean,
	token: AuthToken | null | undefined,
	loading: boolean,
	login: (v: string) => void,
	logout: () => void,
}

export const AdminContext = createContext<AdminContextValues | undefined>(undefined);
