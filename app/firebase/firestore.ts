import {
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { AuthToken, CreatePizzaProps, Pizza, Roommate } from "./types";
import { addDoc } from "firebase/firestore/lite";

const roommatesCollection = collection(db, "roommates");

export async function getRoommates(): Promise<Roommate[]> {
	const snapshot = await getDocs(roommatesCollection);
	return snapshot.docs.map((doc) => doc.data() as Roommate);
}

export async function getRoommate(name: string): Promise<Roommate | null> {
	const snapshot = await getDoc(doc(roommatesCollection, name));
	return snapshot.exists() ? (snapshot.data() as Roommate) : null;
}

export async function addRoommate(name: string): Promise<void> {
	await setDoc(doc(roommatesCollection, name), { name, pizzas: [] } satisfies Roommate);
}

export async function addPizza(
	name: string,
	pizza: CreatePizzaProps
): Promise<Pizza> {
	const newPizza: Pizza = {
		...pizza,
		id: crypto.randomUUID(),
		createdAt: Timestamp.now(),
	};
	await updateDoc(doc(roommatesCollection, name), {
		pizzas: arrayUnion(newPizza),
	});
	return newPizza;
}

export async function removePizza(name: string, pizzaId: string): Promise<void> {
	const roommate = await getRoommate(name);
	if (!roommate) return;
	await updateDoc(doc(roommatesCollection, name), {
		pizzas: roommate.pizzas.filter((pizza) => pizza.id !== pizzaId),
	});
}

export async function addAuthToken(): Promise<string> {
	const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
	const expireAtDate = new Date(Date.now() + ONE_WEEK_IN_MS);

	const ref = await addDoc(collection(db, "auth-tokens"), {
		createdAt: Timestamp.now(),
		expireAt: Timestamp.fromDate(expireAtDate)
	});

	return ref.id
}

export async function getAuthToken(id: string): Promise<AuthToken | null> {
	const ref = doc(db, 'auth-tokens', id);
	const snapshot = await getDoc(ref);
	if (!snapshot.exists()) return null

	const data = snapshot.data() as AuthToken;
	if (data.expireAt.toMillis() < Date.now()) {
		deleteAuthToken(id)
		return null
	};

	return data
}

export async function deleteAuthToken(id: string): Promise<void> {
	await deleteDoc(doc(db, 'auth-tokens', id));
}

