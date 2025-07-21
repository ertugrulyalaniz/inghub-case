import { LitElement, html } from "lit";
import { buttonStyles } from "./button.styles.js";
import { I18nMixin } from "@utils/i18n-mixin.js";

/**
 * @element app-button
 * @fires click - Fired when button is clicked
 *
 * @prop {String} variant - Button variant: primary, secondary, danger, ghost
 * @prop {String} size - Button size: small, medium, large
 * @prop {Boolean} disabled - Disabled state
 * @prop {Boolean} loading - Loading state
 * @prop {Boolean} block - Full width button
 * @prop {Boolean} icon - Icon only button
 * @prop {String} type - Button type: button, submit, reset
 */
export class AppButton extends I18nMixin(LitElement) {
	static styles = [buttonStyles];

	static properties = {
		variant: { type: String },
		size: { type: String },
		disabled: { type: Boolean },
		loading: { type: Boolean },
		block: { type: Boolean },
		icon: { type: Boolean },
		type: { type: String },
	};

	constructor() {
		super();
		this.variant = "primary";
		this.size = "medium";
		this.disabled = false;

		this.block = false;
		this.icon = false;
		this.type = "button";
	}

	render() {
		const classes = this._getClasses();

		return html`
      <button
        class=${classes}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
	}

	_getClasses() {
		const classes = ["btn"];

		classes.push(`btn--${this.variant}`);

		if (this.size !== "medium") {
			classes.push(`btn--${this.size}`);
		}

		if (this.loading) classes.push("btn--loading");
		if (this.block) classes.push("btn--block");
		if (this.icon) classes.push("btn--icon");

		return classes.join(" ");
	}

	_handleClick(e) {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (this.type !== "submit" && this.type !== "reset") {
		}
	}
}

customElements.define("app-button", AppButton);
