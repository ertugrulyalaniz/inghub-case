import { LitElement, html } from "lit";
import { employeeCardStyles } from "./employee-card.styles.js";
import { I18nMixin } from "@utils/i18n-mixin.js";
import "@shared/icon/icon.js";
import "@shared/button/button.js";

/**
 * @element employee-card
 * @fires edit - Fired when edit button is clicked
 * @fires delete - Fired when delete button is clicked
 *
 * @prop {Object} employee - Employee data object
 */
export class EmployeeCard extends I18nMixin(LitElement) {
	static styles = [employeeCardStyles];

	static properties = {
		employee: { type: Object },
	};

	constructor() {
		super();
		this.employee = {};
	}

	render() {
		if (!this.employee || !this.employee.id) {
			return html``;
		}

		return html`
      <div class="card">
        <div class="card__body">
          <div class="card__cell">
            <span class="card__label">${this.t("employee.firstName")}:</span>
            <span class="card__value">${this.employee.firstName}</span>
          </div>
          <div class="card__cell">
            <span class="card__label">${this.t("employee.lastName")}:</span>
            <span class="card__value">${this.employee.lastName}</span>
          </div>
          <div class="card__cell">
            <span class="card__label">${this.t("employee.dateOfEmployment")}:</span>
            <span class="card__value">${this._formatDate(this.employee.dateOfEmployment)}</span>
          </div>
          
          <div class="card__cell">
            <span class="card__label">${this.t("employee.dateOfBirth")}:</span>
            <span class="card__value">${this._formatDate(this.employee.dateOfBirth)}</span>
          </div>
          
          <div class="card__cell">
            <span class="card__label">${this.t("employee.phone")}:</span>
            <span class="card__value">${this.employee.phone}</span>
          </div>
          
          <div class="card__cell">
            <span class="card__label">${this.t("employee.email")}:</span>
            <span class="card__value card__email">${this.employee.email}</span>
          </div>
          
          <div class="card__cell">
            <span class="card__label">${this.t("employee.department")}:</span>
            <span class="card__value">
              ${this.t(`departments.${this.employee.department.toLowerCase()}`)}
            </span>
          </div>
          
          <div class="card__cell">
            <span class="card__label">${this.t("employee.position")}:</span>
            <span class="card__value">
              ${this.t(`positions.${this.employee.position.toLowerCase()}`)}
            </span>
          </div>
        </div>
        <div class="card__actions">
          <app-button
            class="card__action"
            @click=${this._handleEdit}
            title=${this.t("common.edit")}
            variant="secondary"
          >
            <app-icon name="edit" size="small" color="var(--color-white)"></app-icon>
            ${this.t("common.edit")}
          </app-button>
          <app-button
            class="card__action"
            @click=${this._handleDelete}
            title=${this.t("common.delete")}
          >
            <app-icon name="delete" size="small" color="var(--color-white)"></app-icon>
            ${this.t("common.delete")}
          </app-button>
          </div>
      </div>
    `;
	}

	_formatDate(dateString) {
		if (!dateString) return "-";
		const date = new Date(dateString);
		return date.toLocaleDateString(
			this.currentLanguage === "tr" ? "tr-TR" : "en-US",
			{
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			},
		);
	}

	_handleEdit() {
		this.dispatchEvent(
			new CustomEvent("edit", {
				detail: { employee: this.employee },
				bubbles: true,
				composed: true,
			}),
		);
	}

	_handleDelete() {
		this.dispatchEvent(
			new CustomEvent("delete", {
				detail: { employee: this.employee },
				bubbles: true,
				composed: true,
			}),
		);
	}
}

customElements.define("employee-card", EmployeeCard);
