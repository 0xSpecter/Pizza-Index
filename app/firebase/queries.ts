import { useQuery } from "@tanstack/react-query";
import { getAuthToken, getRoommate, getRoommates } from "./firestore";
import { pizzaKeys } from "./types";

export function useRoommates() {
	return useQuery({
		queryKey: pizzaKeys.all,
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

export function useAuthToken(id: string) {
	return useQuery({
		queryKey: pizzaKeys.authToken,
		queryFn: () => getAuthToken(id),
		enabled: !!id,
	})
}
