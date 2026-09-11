import { useEffect, useState } from "react";

const THEME_KEY = "theme";
type Theme = "light" | "dark";

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window === "undefined") return "light";
		return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem(THEME_KEY, theme);
	}, [theme]);

	const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

	return { theme, setTheme, toggleTheme };
}
