import { useState } from "react";

interface useLocalStorageItemProps<S, G, D> {
	set: (arg: S) => void,
	get: () => G,
	del?: (arg: D) => void,
}

/**
 * Makes sure item always has parity with the set localStorage value
*/
export function useLocalStorageItem<S, G, D>({ set, get, del }: useLocalStorageItemProps<S, G, D>) {
	const [item, setItem] = useState<G>(get)

	const setI = () => setItem(get);

	return {
		item, set: (arg: S) => {
			set(arg)
			setI()
		}, del: del ? (arg: D) => {
			del(arg)
			setI()
		} : (_: D) => { }
	}
}
