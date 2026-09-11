import type { Timestamp } from "firebase/firestore";

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
