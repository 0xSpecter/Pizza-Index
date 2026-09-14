import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAuthToken, addPizza, addRoommate, deleteAuthToken, removePizza, removeRoommate } from "./firestore";
import { pizzaKeys, type CreatePizzaProps } from "./types";

export function useAddRoommate() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (name: string) => addRoommate(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.roommates });
		},
	});
}

export function useRemoveRoommate() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (name: string) => removeRoommate(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.roommates });
			queryClient.invalidateQueries({ queryKey: pizzaKeys.pizzas });
		},
	});
}

export function useAddPizza() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ name, pizza }: { name: string; pizza: CreatePizzaProps }) =>
			addPizza(name, pizza),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: pizzaKeys.pizzas });
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
