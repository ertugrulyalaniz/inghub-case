import i18n from "@locales/index.js";

/**
 * Mixin to add i18n support to LitElement components
 * @param {Class} superClass - The class to extend
 * @returns {Class} - Extended class with i18n support
 */
export const I18nMixin = (superClass) =>
	class extends superClass {
		constructor() {
			super();
			this._i18nUnsubscribe = null;
		}

		connectedCallback() {
			super.connectedCallback();

			this._i18nUnsubscribe = i18n.subscribe(() => {
				this.requestUpdate();
			});
		}

		disconnectedCallback() {
			super.disconnectedCallback();

			if (this._i18nUnsubscribe) {
				this._i18nUnsubscribe();
				this._i18nUnsubscribe = null;
			}
		}

		t(key, params) {
			return i18n.t(key, params);
		}

		get currentLanguage() {
			return i18n.getLanguage();
		}

		setLanguage(lang) {
			i18n.setLanguage(lang);
		}

		get isRTL() {
			return false;
		}
	};
