import { useContext, useEffect } from "react";
import { AdminContext } from "~/firebase/types";

export function useAdmin() {
	const context = useContext(AdminContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	useEffect(() => {
		if (context.loading) return;
	}, [context.loading]);


	return {
		authed: context.authed,
		token: context.token,
		loading: context.loading,
		login: context.login,
		logout: context.logout,
	}
}
