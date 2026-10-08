import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAuthToken, addPizza, addRoommate, deleteAuthToken, removePizza, removeRoommate } from "./firestore";
import { pizzaKeys, type CreatePizzaProps, type Pizza, type RoommateName } from "./types";
import { addToAddedPizzas, setAddPizzaPreferences } from "./utils";

export function useAddRoommate() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (name: RoommateName) => addRoommate(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.roommates });
		},
	});
}

export function useRemoveRoommate() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (name: RoommateName) => removeRoommate(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.roommates });
			queryClient.invalidateQueries({ queryKey: pizzaKeys.pizzas });
		},
	});
}

export function useAddPizza() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (pizza: CreatePizzaProps) => {
			return addPizza(pizza)
		},
		onSuccess: (pizza: Pizza) => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.pizzas });
			setAddPizzaPreferences(pizza);
		},
	});
}

export function useRemovePizza() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (pizzaId: string) => removePizza(pizzaId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.pizzas });
		},
	});
}

export function useAddAuthToken() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => addAuthToken(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.authToken });
		},
	});
}

export function useDeleteAuthToken() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteAuthToken(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.authToken });
		},
	});
}
