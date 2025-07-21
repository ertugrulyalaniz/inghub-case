import { LitElement, html } from "lit";
import { dialogStyles } from "./dialog.styles.js";
import { I18nMixin } from "@utils/i18n-mixin.js";

/**
 * @element app-dialog
 * @fires close - Fired when dialog is closed
 * @fires confirm - Fired when confirm button is clicked
 * @fires cancel - Fired when cancel button is clicked
 *
 * @prop {Boolean} open - Dialog open state
 * @prop {String} title - Dialog title
 * @prop {String} size - Dialog size: small, medium, large
 * @prop {Boolean} modal - Modal mode (prevents closing on backdrop click)
 * @prop {Boolean} showClose - Show close button
 * @prop {String} confirmText - Confirm button text
 * @prop {String} cancelText - Cancel button text
 * @prop {String} confirmVariant - Confirm button variant
 * @prop {Boolean} loading - Loading state for confirm button
 * @prop {Boolean} hideFooter - Hide footer with buttons
 */
export class AppDialog extends I18nMixin(LitElement) {
	static styles = [dialogStyles];

	static properties = {
		open: { type: Boolean, reflect: true },
		title: { type: String },
		size: { type: String },
		modal: { type: Boolean },
		showClose: { type: Boolean },
		confirmText: { type: String },
		cancelText: { type: String },
		confirmVariant: { type: String },
		loading: { type: Boolean },
		hideFooter: { type: Boolean },
	};

	constructor() {
		super();
		this.open = false;
		this.title = "";
		this.size = "medium";
		this.modal = false;
		this.showClose = true;
		this.confirmText = "";
		this.cancelText = "";
		this.confirmVariant = "primary";
		this.loading = false;
		this.hideFooter = false;
		this._previousFocus = null;
	}

	updated(changedProperties) {
		if (changedProperties.has("open")) {
			if (this.open) {
				this._onOpen();
			} else {
				this._onClose();
			}
		}
	}

	render() {
		if (!this.open) return html``;

		const dialogClasses = `dialog dialog--${this.size}`;

		return html`
      <div class="dialog-backdrop" @click=${this._handleBackdropClick}>
        <div 
          class=${dialogClasses}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          @click=${(e) => e.stopPropagation()}
        >
          ${this._renderHeader()}
          ${this._renderBody()}
          ${this._renderFooter()}
        </div>
      </div>
    `;
	}

	_renderHeader() {
		if (!this.title && !this.showClose) return "";

		return html`
      <div class="dialog__header">
        ${
					this.title
						? html`
          <h2 id="dialog-title" class="dialog__title">${this.title}</h2>
        `
						: ""
				}
        ${
					this.showClose
						? html`
          <button
            class="dialog__close"
            @click=${this._handleClose}
            aria-label=${this.t("common.close")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        `
						: ""
				}
      </div>
    `;
	}

	_renderBody() {
		return html`
      <div class="dialog__body">
        <slot></slot>
      </div>
    `;
	}

	_renderFooter() {
		if (this.hideFooter) return "";

		const confirmText = this.confirmText || this.t("common.confirm");
		const cancelText = this.cancelText || this.t("common.cancel");

		return html`
      <div class="dialog__footer">
        <slot name="footer">
          <button
            class="btn btn--secondary"
            @click=${this._handleCancel}
            ?disabled=${this.loading}
          >
            ${cancelText}
          </button>
          <button
            class="btn btn--${this.confirmVariant}"
            @click=${this._handleConfirm}
            ?disabled=${this.loading}
          >
            ${
							this.loading
								? html`
              <span class="btn__loader"></span>
            `
								: confirmText
						}
          </button>
        </slot>
      </div>
    `;
	}

	_handleBackdropClick(e) {
		if (!this.modal && e.target === e.currentTarget) {
			this._handleClose();
		}
	}

	_handleClose() {
		this.open = false;
		this.dispatchEvent(
			new CustomEvent("close", {
				bubbles: true,
				composed: true,
			}),
		);
	}

	_handleCancel() {
		this.dispatchEvent(
			new CustomEvent("cancel", {
				bubbles: true,
				composed: true,
			}),
		);
		this._handleClose();
	}

	_handleConfirm() {
		this.dispatchEvent(
			new CustomEvent("confirm", {
				bubbles: true,
				composed: true,
			}),
		);
	}

	_onOpen() {
		this._previousFocus = document.activeElement;

		document.body.style.overflow = "hidden";

		requestAnimationFrame(() => {
			const focusable = this._getFocusableElements();
			if (focusable.length > 0) {
				focusable[0].focus();
			}
		});

		this._escKeyHandler = (e) => {
			if (e.key === "Escape" && !this.modal) {
				this._handleClose();
			}
		};
		document.addEventListener("keydown", this._escKeyHandler);
	}

	_onClose() {
		document.body.style.overflow = "";

		if (this._escKeyHandler) {
			document.removeEventListener("keydown", this._escKeyHandler);
		}

		if (this._previousFocus && this._previousFocus.focus) {
			this._previousFocus.focus();
		}
	}

	_getFocusableElements() {
		const selector =
			'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
		return this.shadowRoot.querySelectorAll(selector);
	}

	show() {
		this.open = true;
	}

	hide() {
		this.open = false;
	}
}

customElements.define("app-dialog", AppDialog);
