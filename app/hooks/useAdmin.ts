import { useState } from "react";
import { useAddAuthToken, useDeleteAuthToken } from "~/firebase/mutations";
import { useAuthToken } from "~/firebase/queries";
import { AUTH_TOKEN_KEY, PASSWORD } from "~/firebase/types";

export function useAdmin() {
	const [tokenId, setTokenId] = useState(
		() => localStorage.getItem(AUTH_TOKEN_KEY) ?? ""
	)

	const { data: token, isLoading: loading } = useAuthToken(tokenId)
	const { mutate: deleteAuthToken } = useDeleteAuthToken()
	const { mutateAsync: addAuthToken } = useAddAuthToken()

	const authed = !!token

	const login = async (passwordAttempt: string) => {
		if (passwordAttempt !== PASSWORD) return false

		const id = await addAuthToken()
		setTokenId(id)
		localStorage.setItem(AUTH_TOKEN_KEY, id)
		return true
	}

	const logout = async () => {
		if (!tokenId) {
			throw new Error("Not logged in")
		}
		deleteAuthToken(tokenId)
		localStorage.removeItem(AUTH_TOKEN_KEY)
		setTokenId("")
	}

	return { authed, token, loading, login, logout }
}
