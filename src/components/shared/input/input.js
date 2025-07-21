import { LitElement, html } from "lit";
import { inputStyles } from "./input.styles.js";
import { I18nMixin } from "@utils/i18n-mixin.js";
import { VALIDATION } from "@config/constants.js";

/**
 * @element app-input
 * @fires input - Fired when input value changes
 * @fires change - Fired when input loses focus
 * @fires enter - Fired when Enter key is pressed
 *
 * @prop {String} label - Input label
 * @prop {String} type - Input type: text, email, tel, password, date, number
 * @prop {String} name - Input name
 * @prop {String} value - Input value
 * @prop {String} placeholder - Input placeholder
 * @prop {Boolean} required - Required field
 * @prop {Boolean} disabled - Disabled state
 * @prop {Boolean} readonly - Readonly state
 * @prop {String} error - Error message
 * @prop {String} hint - Helper text
 * @prop {String} icon - Icon to display
 * @prop {String} pattern - Validation pattern
 * @prop {Number} minlength - Minimum length
 * @prop {Number} maxlength - Maximum length
 * @prop {String} min - Minimum value (for date/number)
 * @prop {String} max - Maximum value (for date/number)
 * @prop {Boolean} autofocus - Autofocus on mount
 */
export class AppInput extends I18nMixin(LitElement) {
	static styles = [inputStyles];

	static properties = {
		label: { type: String },
		type: { type: String },
		name: { type: String },
		value: { type: String },
		placeholder: { type: String },
		required: { type: Boolean },
		disabled: { type: Boolean },
		readonly: { type: Boolean },
		error: { type: String },
		hint: { type: String },
		icon: { type: String },
		pattern: { type: String },
		minlength: { type: Number },
		maxlength: { type: Number },
		min: { type: String },
		max: { type: String },
		autofocus: { type: Boolean },
		_focused: { type: Boolean, state: true },
	};

	constructor() {
		super();
		this.label = "";
		this.type = "text";
		this.name = "";
		this.value = "";
		this.placeholder = "";
		this.required = false;
		this.disabled = false;
		this.readonly = false;
		this.error = "";
		this.hint = "";
		this.icon = "";
		this.pattern = "";
		this.autofocus = false;
		this._focused = false;
	}

	firstUpdated() {
		if (this.autofocus) {
			this.shadowRoot.querySelector("input").focus();
		}
	}

	render() {
		const inputClasses = this._getInputClasses();
		const showError = this.error && !this._focused;
		const currentLength = this.value?.length || 0;

		return html`
      <div class="form-group">
        ${
					this.label
						? html`
          <label class="form-label ${this.required ? "required" : ""}">
            ${this.label}
          </label>
        `
						: ""
				}
        
        <div class="input-wrapper">
          ${
						this.icon
							? html`
            <span class="input-icon">
              <slot name="icon">${this.icon}</slot>
            </span>
          `
							: ""
					}
          
          <input
            class=${inputClasses}
            type=${this.type}
            name=${this.name}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?required=${this.required}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            pattern=${this.pattern || ""}
            minlength=${this.minlength || ""}
            maxlength=${this.maxlength || ""}
            min=${this.min || ""}
            max=${this.max || ""}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            @keydown=${this._handleKeydown}
          />
          
          ${
						this.maxlength
							? html`
            <span class="char-count ${this._isOverLimit() ? "over-limit" : ""}">
              ${currentLength}/${this.maxlength}
            </span>
          `
							: ""
					}
        </div>
        
        ${
					showError
						? html`
          <div class="form-error">${this.error}</div>
        `
						: this.hint
							? html`
          <div class="form-hint">${this.hint}</div>
        `
							: ""
				}
      </div>
    `;
	}

	_getInputClasses() {
		const classes = ["form-input"];

		if (this.error) classes.push("error");
		if (this.icon) classes.push("has-icon");
		if (this._focused) classes.push("focused");

		return classes.join(" ");
	}

	_isOverLimit() {
		const currentValue =
			this.shadowRoot?.querySelector("input")?.value || this.value || "";
		return this.maxlength && currentValue.length > this.maxlength;
	}

	_handleInput(e) {
		const value = e.target.value;
		this.value = value;
		this.dispatchEvent(
			new CustomEvent("input", {
				detail: { value, name: this.name },
				bubbles: true,
				composed: true,
			}),
		);
	}

	_handleChange(e) {
		const value = e.target.value;
		this._validateInput(value);
		this.value = value;
		this.dispatchEvent(
			new CustomEvent("change", {
				detail: { value, name: this.name },
				bubbles: true,
				composed: true,
			}),
		);
	}

	_handleFocus() {
		this._focused = true;
	}

	_handleBlur() {
		this._focused = false;
		this._validateInput();
	}

	_handleKeydown(e) {
		if (e.key === "Enter") {
			const value = e.target.value;
			this.dispatchEvent(
				new CustomEvent("enter", {
					detail: { value, name: this.name },
					bubbles: true,
					composed: true,
				}),
			);
		}
	}

	_validateInput(value = this.value) {
		this.error = "";

		if (this.required && !value.trim()) {
			this.error = this.t("validation.required");
			return false;
		}

		if (this.type === "email" && value) {
			if (!VALIDATION.EMAIL.test(value)) {
				this.error = this.t("validation.invalidEmail");
				return false;
			}
		}

		if (this.type === "tel" && value) {
			if (!VALIDATION.PHONE.test(value)) {
				this.error = this.t("validation.invalidPhone");
				return false;
			}
		}

		if (this.minlength && value.length < this.minlength) {
			this.error = this.t("validation.minLength", { min: this.minlength });
			return false;
		}

		if (this.maxlength && value.length > this.maxlength) {
			this.error = this.t("validation.maxLength", { max: this.maxlength });
			return false;
		}

		if (this.pattern && value) {
			const regex = new RegExp(this.pattern);
			if (!regex.test(value)) {
				this.error = this.t("validation.invalidFormat");
				return false;
			}
		}

		return true;
	}

	validate() {
		return this._validateInput();
	}

	reset() {
		this.value = "";
		this.error = "";
		this._focused = false;
	}

	focus() {
		this.shadowRoot.querySelector("input").focus();
	}
}

customElements.define("app-input", AppInput);
