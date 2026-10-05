import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Route } from "./+types/root";
import "./app.scss";
import "./i18n/i18n";
import styles from "./root.module.scss";
import AdminProvider from "./providers/AdminProvider";

const queryClient = new QueryClient();

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&family=Luckiest+Guy&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	// Re-render on language change so <Meta /> picks up the translated titles.
	useTranslation();
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<script
					dangerouslySetInnerHTML={{
						__html: `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`,
					}}
				/>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const { t } = useTranslation();
	return (
		<QueryClientProvider client={queryClient}>
			<AdminProvider>
				<Suspense fallback={<main className={styles.loadingMain}>{t("common.loading")}</main>}>
					<Outlet />
				</Suspense>
			</AdminProvider>
		</QueryClientProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const { t } = useTranslation();
	let message = t("error.oops");
	let details = t("error.unexpected");
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : t("error.error");
		details =
			error.status === 404
				? t("error.notFound")
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className={styles.errorMain}>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className={styles.stack}>
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
