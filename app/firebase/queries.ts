import { useQuery } from "@tanstack/react-query";
import { getAuthToken, getPizzas, getRoommate, getRoommates } from "./firestore";
import { pizzaKeys } from "./types";

export function useRoommates() {
	return useQuery({
		queryKey: pizzaKeys.roommates,
		queryFn: getRoommates,
	});
}

export function useRoommate(name: string) {
	return useQuery({
		queryKey: pizzaKeys.roommate(name),
		queryFn: () => getRoommate(name),
		enabled: !!name,
	});
}

export function usePizzas() {
	return useQuery({
		queryKey: pizzaKeys.pizzas,
		queryFn: getPizzas,
	});
}

export function useAuthToken(id: string) {
	return useQuery({
		queryKey: pizzaKeys.authToken,
		queryFn: () => getAuthToken(id),
		enabled: !!id,
	})
}
