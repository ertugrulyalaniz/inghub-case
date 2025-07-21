import en from "./en.js";
import tr from "./tr.js";
import { LANGUAGES, STORAGE_KEYS, EVENTS } from "@config/constants.js";

class I18nManager {
	constructor() {
		this.translations = {
			[LANGUAGES.EN]: en,
			[LANGUAGES.TR]: tr,
		};

		this.currentLanguage = this.detectLanguage();
		this.listeners = new Set();
	}

	detectLanguage() {
		const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
		if (savedLang && this.translations[savedLang]) {
			return savedLang;
		}

		const htmlLang = document.documentElement.lang?.toLowerCase();
		if (htmlLang && this.translations[htmlLang]) {
			return htmlLang;
		}

		return LANGUAGES.EN;
	}

	getLanguage() {
		return this.currentLanguage;
	}

	setLanguage(lang) {
		if (this.translations[lang] && lang !== this.currentLanguage) {
			this.currentLanguage = lang;
			localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
			document.documentElement.lang = lang;
			this.notifyListeners();

			window.dispatchEvent(
				new CustomEvent(EVENTS.LANGUAGE_CHANGED, {
					detail: { language: lang },
				}),
			);
		}
	}

	t(keyPath, params = {}) {
		const keys = keyPath.split(".");
		let value = this.translations[this.currentLanguage];

		for (const key of keys) {
			value = value?.[key];
			if (value === undefined) {
				console.warn(
					`Translation missing for key: ${keyPath} in language: ${this.currentLanguage}`,
				);

				value = this.translations[LANGUAGES.EN];
				for (const k of keys) {
					value = value?.[k];
				}
				break;
			}
		}

		if (value === undefined) {
			return keyPath;
		}

		if (typeof value === "string" && Object.keys(params).length > 0) {
			return value.replace(/{(\w+)}/g, (match, key) => {
				return params[key] !== undefined ? params[key] : match;
			});
		}

		return value;
	}

	subscribe(callback) {
		this.listeners.add(callback);
		return () => this.listeners.delete(callback);
	}

	notifyListeners() {
		this.listeners.forEach((callback) => callback(this.currentLanguage));
	}

	getTranslations() {
		return this.translations[this.currentLanguage];
	}

	isLanguageSupported(lang) {
		return Boolean(this.translations[lang]);
	}

	getAvailableLanguages() {
		return Object.keys(this.translations);
	}
}

const i18n = new I18nManager();

export default i18n;
export const t = (key, params) => i18n.t(key, params);
