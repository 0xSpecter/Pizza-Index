import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
	addDoc,
	Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { AuthToken, CreatePizzaProps, Pizza, Roommate } from "./types";

const roommatesCollection = collection(db, "roommates");
const pizzasCollection = collection(db, "pizzas");

export async function getRoommates(): Promise<Roommate[]> {
	const snapshot = await getDocs(roommatesCollection);
	return snapshot.docs.map((doc) => doc.data() as Roommate);
}

export async function getRoommate(name: string): Promise<Roommate | null> {
	const snapshot = await getDoc(doc(roommatesCollection, name.toLowerCase()));
	return snapshot.exists() ? (snapshot.data() as Roommate) : null;
}

export async function addRoommate(name: string): Promise<void> {
	await setDoc(doc(roommatesCollection, name.toLowerCase()), { name } satisfies Roommate);
}

export async function removeRoommate(name: string): Promise<void> {
	const pizzasSnapshot = await getDocs(query(pizzasCollection, where("roommate", "==", name)));
	await Promise.all([
		deleteDoc(doc(roommatesCollection, name.toLowerCase())),
		...pizzasSnapshot.docs.map((pizzaDoc) => deleteDoc(pizzaDoc.ref)),
	]);
}

export async function getPizzas(): Promise<Pizza[]> {
	const snapshot = await getDocs(pizzasCollection);
	return snapshot.docs.map((doc) => doc.data() as Pizza);
}

export async function addPizza(
	name: string,
	pizza: CreatePizzaProps
): Promise<Pizza> {
	const ref = doc(pizzasCollection);
	const newPizza: Pizza = {
		...pizza,
		id: ref.id,
		roommate: name,
		createdAt: Timestamp.now(),
	};
	await setDoc(ref, newPizza);
	return newPizza;
}

export async function removePizza(pizzaId: string): Promise<void> {
	await deleteDoc(doc(pizzasCollection, pizzaId));
}

export async function addAuthToken(): Promise<string | null> {
	const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
	const expireAtDate = new Date(Date.now() + ONE_WEEK_IN_MS);

	const ref = await addDoc(collection(db, "auth-tokens"), {
		createdAt: Timestamp.now(),
		expireAt: Timestamp.fromDate(expireAtDate)
	});

	return ref?.id
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
