import { useEffect, useState } from "react";

const THEME_KEY = "theme";
type Theme = "light" | "dark";

function readTheme(): Theme {
	if (typeof document === "undefined") return "light";
	if (document.documentElement.classList.contains("dark")) return "dark";
	return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(readTheme);

	// Keep the DOM class in sync with our own state (covers the initial
	// localStorage fallback above, since the class may not be set yet).
	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	// Stay in sync with class changes made outside this hook (e.g. Storybook's
	// theme toolbar), which bypass our state entirely.
	useEffect(() => {
		const root = document.documentElement;
		const observer = new MutationObserver(() => setTheme(readTheme()));
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	const applyTheme = (next: Theme) => {
		localStorage.setItem(THEME_KEY, next);
		setTheme(next);
	};

	const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");

	return { theme, setTheme: applyTheme, toggleTheme };
}
