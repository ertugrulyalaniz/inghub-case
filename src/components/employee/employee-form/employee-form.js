import { LitElement, html } from "lit";
import { employeeFormStyles } from "./employee-form.styles.js";
import { I18nMixin } from "@utils/i18n-mixin.js";
import { DEPARTMENTS, POSITIONS } from "@config/constants.js";
import { employeeService } from "@services/employee-service.js";
import "@shared/input/input.js";
import "@shared/button/button.js";
import "@shared/icon/icon.js";

/**
 * @element employee-form
 * @fires submit - Fired when form is submitted with valid data
 * @fires cancel - Fired when cancel button is clicked
 *
 * @prop {Object} employee - Employee data for editng (null for new employe)
 * @prop {Boolean} loading - Loading state
 */
export class EmployeeForm extends I18nMixin(LitElement) {
	static styles = [employeeFormStyles];

	static properties = {
		employee: { type: Object },
		loading: { type: Boolean },
		errors: { type: Object },
		formData: { type: Object },
	};

	constructor() {
		super();
		this.employee = null;
		this.loading = false;
		this.errors = {};
		this.formData = this._getEmptyFormData();
	}

	updated(changedProperties) {
		if (changedProperties.has("employee") && this.employee) {
			this.formData = {
				firstName: this.employee.firstName || "",
				lastName: this.employee.lastName || "",
				email: this.employee.email || "",
				phone: this.employee.phone || "",
				dateOfBirth: this.employee.dateOfBirth || "",
				dateOfEmployment: this.employee.dateOfEmployment || "",
				department: this.employee.department || "",
				position: this.employee.position || "",
			};
		}
	}

	render() {
		const isEdit = !!this.employee;
		const title = isEdit
			? `${this.t("employee.editingEmployee")}: ${this.employee.firstName} ${this.employee.lastName}`
			: "";

		return html`
      <div class="form-container">
        <h2 class="form-title">${title}</h2>
        
        <form class="form" @submit=${this._handleSubmit}>
          <div class="form-grid">
            <app-input
              label=${this.t("employee.firstName")}
              name="firstName"
              .value=${this.formData.firstName}
              .error=${this.errors.firstName}
              @input=${this._handleInput}
              required
              autofocus
            ></app-input>

            <app-input
              label=${this.t("employee.lastName")}
              name="lastName"
              .value=${this.formData.lastName}
              .error=${this.errors.lastName}
              @input=${this._handleInput}
              required
            ></app-input>

            <app-input
              label=${this.t("employee.email")}
              name="email"
              type="email"
              .value=${this.formData.email}
              .error=${this.errors.email}
              @input=${this._handleInput}
              required
            ></app-input>

            <app-input
              label=${this.t("employee.phone")}
              name="phone"
              type="tel"
              .value=${this.formData.phone}
              .error=${this.errors.phone}
              @input=${this._handleInput}
              placeholder="+90 5XX XXX XX XX"
              required
            ></app-input>

            <app-input
              label=${this.t("employee.dateOfBirth")}
              name="dateOfBirth"
              type="date"
              .value=${this.formData.dateOfBirth}
              .error=${this.errors.dateOfBirth}
              @input=${this._handleInput}
              max=${this._getMaxBirthDate()}
              required
            ></app-input>

            <app-input
              label=${this.t("employee.dateOfEmployment")}
              name="dateOfEmployment"
              type="date"
              .value=${this.formData.dateOfEmployment}
              .error=${this.errors.dateOfEmployment}
              @input=${this._handleInput}
              max=${this._getTodayDate()}
              required
            ></app-input>

            <div class="form-group">
              <label class="form-label required">
                ${this.t("employee.department")}
              </label>
              <select
                class="form-select ${this.errors.department ? "error" : ""}"
                name="department"
                .value=${this.formData.department}
                @change=${this._handleSelectChange}
                required
              >
                <option value="">${this.t("common.selectOption")}</option>
                ${Object.entries(DEPARTMENTS).map(
									([key, value]) => html`
                  <option value=${value} ?selected=${this.formData.department === value}>
                    ${this.t(`departments.${value.toLowerCase()}`)}
                  </option>
                `,
								)}
              </select>
              ${this.errors.department ? html`<div class="form-error">${this.errors.department}</div>` : ""}
            </div>

            <div class="form-group">
              <label class="form-label required">
                ${this.t("employee.position")}
              </label>
              <select
                class="form-select ${this.errors.position ? "error" : ""}"
                name="position"
                .value=${this.formData.position}
                @change=${this._handleSelectChange}
                required
              >
                <option value="">${this.t("common.selectOption")}</option>
                ${Object.entries(POSITIONS).map(
									([key, value]) => html`
                  <option value=${value} ?selected=${this.formData.position === value}>
                    ${this.t(`positions.${value.toLowerCase()}`)}
                  </option>
				  `,
								)}
              </select>
              ${this.errors.position ? html`<div class="form-error">${this.errors.position}</div>` : ""}
            </div>
          </div>

          <div class="form-actions">
            
            <app-button
              variant="primary"
              @click=${this._handleSubmit}
			  type="submit"
              ?loading=${this.loading}
              ?disabled=${this.loading}
            >
              ${isEdit ? this.t("common.update") : this.t("common.save")}
            </app-button>

            <app-button
              variant="ghost"
              type="button"
              @click=${this._handleCancel}
              ?disabled=${this.loading}
            >
              ${this.t("common.cancel")}
            </app-button>
          </div>
        </form>
      </div>
    `;
	}

	_getEmptyFormData() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			dateOfBirth: "",
			dateOfEmployment: "",
			department: "",
			position: "",
		};
	}

	_getTodayDate() {
		return new Date().toISOString().split("T")[0];
	}

	_getMaxBirthDate() {
		const today = new Date();
		const maxBirthDate = new Date(
			today.getFullYear() - 18,
			today.getMonth(),
			today.getDate(),
		);
		return maxBirthDate.toISOString().split("T")[0];
	}

	_handleInput(e) {
		const { name } = e.target;
		const value = e.detail?.value ?? e.target.value;

		this.formData = {
			...this.formData,
			[name]: value,
		};

		if (this.errors[name]) {
			this.errors = {
				...this.errors,
				[name]: "",
			};
		}
	}

	_handleSelectChange(e) {
		const { name, value } = e.target;
		this.formData = {
			...this.formData,
			[name]: value,
		};

		if (this.errors[name]) {
			this.errors = {
				...this.errors,
				[name]: "",
			};
		}
	}

	_handleSubmit(e) {
		e.preventDefault();
		e.stopPropagation();

		const formElement = e.target;
		const inputs = formElement.querySelectorAll("app-input");

		inputs.forEach((input) => {
			if (input.name) {
				this.formData[input.name] = input.value;
			}
		});

		const selects = formElement.querySelectorAll("select");
		selects.forEach((select) => {
			if (select.name) {
				this.formData[select.name] = select.value;
			}
		});

		const validation = employeeService.validateEmployee(
			this.employee ? { ...this.employee, ...this.formData } : this.formData,
			!!this.employee,
		);

		if (!validation.isValid) {
			this.errors = validation.errors;
			const firstErrorField = Object.keys(validation.errors)[0];
			const errorInput = this.shadowRoot.querySelector(
				`app-input[name="${firstErrorField}"]`,
			);
			if (errorInput && errorInput.focus) {
				errorInput.focus();
			}
			return;
		}

		this.errors = {};

		this.dispatchEvent(
			new CustomEvent("submit", {
				detail: {
					data: this.formData,
					isEdit: !!this.employee,
				},
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
	}

	reset() {
		this.formData = this._getEmptyFormData();
		this.errors = {};
	}

	setLoading(loading) {
		this.loading = loading;
	}
}

customElements.define("employee-form", EmployeeForm);
