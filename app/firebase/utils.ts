import { PREF_ROOMMATE_KEY, PREF_SIZE_KEY, type PizzaSize, type RoommateName } from "./types";

export function setAddPizzaPreferences(roommateName: RoommateName, size: PizzaSize) {
	if (!window) return;

	window.localStorage.setItem(PREF_ROOMMATE_KEY, roommateName);
	window.localStorage.setItem(PREF_SIZE_KEY, size);
}

export function getAddPizzaPreferences(): { roommateName?: RoommateName, size?: PizzaSize } {
	if (!window) return {};

	const roommateName: RoommateName | null = window.localStorage.getItem(PREF_ROOMMATE_KEY);
	const size: PizzaSize | null = window.localStorage.getItem(PREF_SIZE_KEY) as PizzaSize | null;

	return { roommateName: roommateName ? roommateName : undefined, size: size ? size : undefined }
}

export function purgeAddPizzaPreferences() {
	if (!window) return {};

	window.localStorage.removeItem(PREF_ROOMMATE_KEY);
	window.localStorage.removeItem(PREF_SIZE_KEY);
}
