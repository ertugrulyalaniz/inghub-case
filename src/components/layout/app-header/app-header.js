import { LitElement, html } from "lit";
import { appHeaderStyles } from "./app-header.styles.js";
import { I18nMixin } from "@utils/i18n-mixin.js";
import "@shared/icon/icon.js";
import "@shared/button/button.js";
import i18n from "@locales/index.js";
import { LANGUAGES } from "@config/constants.js";

/**
 * @element app-header
 * @fires toggle-sidebar - Fired when sidebar toggle is clicked
 */
export class AppHeader extends I18nMixin(LitElement) {
	static styles = [appHeaderStyles];

	static properties = {
		currentLanguage: { type: String },
		showLanguageMenu: { type: Boolean },
	};

	constructor() {
		super();
		this.currentLanguage = i18n.getLanguage();
		this.showLanguageMenu = false;

		this._languageUnsubscribe = i18n.subscribe(() => {
			this.currentLanguage = i18n.getLanguage();
		});
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this._languageUnsubscribe) {
			this._languageUnsubscribe();
		}
	}

	render() {
		return html`
      <header class="header">
        <div class="header__left">
          <div class="header__brand">
            <img src="/logo.svg" alt="Company Logo" class="header__logo">
            <span class="header__title">ING</span>
          </div>
        </div>
        
        <div class="header__right">
        
          <app-button variant="ghost" @click=${() => this._navigate("/employees")}>
            <app-icon name="users" color="var(--color-primary)"></app-icon>
            ${this.t("nav.employees")}
          </app-button>

          <app-button variant="ghost" @click=${() => this._navigate("/employees/add")}>
            <app-icon name="plus" size="16" color="var(--color-primary)"></app-icon>
            ${this.t("nav.addEmployee")}
          </app-button>
          
          <div class="header__language">
            <button 
              class="header__language-toggle"
              @click=${this._toggleLanguageMenu}
              aria-label=${this.t("nav.language")}
            >
              ${this.currentLanguage === LANGUAGES.EN ? "🇬🇧" : "🇹🇷"}
            </button>
            
            ${
							this.showLanguageMenu
								? html`
              <div class="header__language-menu">
                <button 
                  class="header__language-option ${this.currentLanguage === LANGUAGES.EN ? "active" : ""}"
                  @click=${() => this._setLanguage(LANGUAGES.EN)}
                >
                  🇬🇧 English
                </button>
                <button 
                  class="header__language-option ${this.currentLanguage === LANGUAGES.TR ? "active" : ""}"
                  @click=${() => this._setLanguage(LANGUAGES.TR)}
                >
                  🇹🇷 Türkçe
                </button>
              </div>
            `
								: ""
						}
          </div>
        </div>
      </header>
    `;
	}

	_navigate(path) {
		import("../../../router.js").then(({ navigateTo }) => {
			navigateTo(path);
		});
	}

	_toggleLanguageMenu() {
		this.showLanguageMenu = !this.showLanguageMenu;

		if (this.showLanguageMenu) {
			const closeMenu = (e) => {
				if (!e.composedPath().includes(this)) {
					this.showLanguageMenu = false;
					document.removeEventListener("click", closeMenu);
				}
			};

			setTimeout(() => {
				document.addEventListener("click", closeMenu);
			}, 0);
		}
	}

	_setLanguage(lang) {
		i18n.setLanguage(lang);
		this.showLanguageMenu = false;
	}
}

customElements.define("app-header", AppHeader);
