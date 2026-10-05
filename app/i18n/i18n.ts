import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import nb from "./locales/nb.json";

const LANGUAGE_KEY = "language";
export const languages = ["en", "nb"] as const;
export type Language = (typeof languages)[number];

function isLanguage(value: string | null): value is Language {
	return languages.includes(value as Language);
}

function readLanguage(): Language {
	if (typeof window === "undefined") return "en";
	const stored = localStorage.getItem(LANGUAGE_KEY);
	if (isLanguage(stored)) return stored;
	return /^(nb|nn|no)\b/.test(navigator.language) ? "nb" : "en";
}

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		nb: { translation: nb },
	},
	lng: readLanguage(),
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

function syncDocument(language: string) {
	if (typeof window === "undefined") return;
	document.documentElement.lang = language;
}

syncDocument(i18n.language);
i18n.on("languageChanged", (language) => {
	if (typeof window === "undefined") return;
	localStorage.setItem(LANGUAGE_KEY, language);
	syncDocument(language);
});

export default i18n;
