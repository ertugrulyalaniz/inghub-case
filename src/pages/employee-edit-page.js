import { LitElement, html, css } from "lit";
import { I18nMixin } from "@utils/i18n-mixin.js";
import { stateManager } from "@services/state-manager.js";
import { employeeService } from "@services/employee-service.js";
import { navigateTo } from "../router.js";
import { ROUTES } from "@config/routes.js";
import "@components/employee/employee-form/employee-form.js";
import "@shared/dialog/dialog.js";

export class EmployeeEditPage extends I18nMixin(LitElement) {
	static styles = css`
    :host {
      display: block;
    }

     .page-header {
      margin-bottom: var(--spacing-6);
    }
    .page-title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary);
      margin: 0 0 var(--spacing-2) 0;
    }

    .back-link:hover {
      text-decoration: underline;
    }

    .error-state {
      text-align: center;
      padding: var(--spacing-12);
      background-color: var(--color-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-base);
    }

    .error-state__icon {
      color: var(--color-error);
      margin-bottom: var(--spacing-4);
    }

    .error-state__title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-900);
      margin: 0 0 var(--spacing-2) 0;
    }

    .error-state__text {
      color: var(--color-gray-600);
      margin: 0 0 var(--spacing-6) 0;
    }
  `;

	static properties = {
		employeeId: { type: String },
		employee: { type: Object },
		loading: { type: Boolean },
		error: { type: Boolean },
		showConfirmDialog: { type: Boolean },
		pendingData: { type: Object },
	};

	constructor() {
		super();
		this.employeeId = "";
		this.employee = null;
		this.loading = false;
		this.error = false;
		this.showConfirmDialog = false;
		this.pendingData = null;
	}

	firstUpdated() {
		if (this.employeeId) {
			this._loadEmployee();
		}
	}

	updated(changedProperties) {
		if (changedProperties.has("employeeId") && this.employeeId) {
			this._loadEmployee();
		}
	}

	_loadEmployee() {
		const employee = employeeService.getEmployeeById(this.employeeId);
		if (employee) {
			this.employee = employee;
			this.error = false;
		} else {
			this.error = true;
		}
	}

	render() {
		if (this.error) {
			return this._renderError();
		}

		if (!this.employee) {
			return html`<div>Loading...</div>`;
		}

		return html`
      <div class="page-header">
        <h1 class="page-title">${this.t("employee.editEmployee")}</h1>
      </div>

      <employee-form
        .employee=${this.employee}
        @submit=${this._handleSubmit}
        @cancel=${this._handleCancel}
        ?loading=${this.loading}
      ></employee-form>

      <app-dialog
        ?open=${this.showConfirmDialog}
        title=${this.t("confirmations.updateEmployee.title")}
        confirmText=${this.t("confirmations.updateEmployee.confirm")}
        cancelText=${this.t("confirmations.updateEmployee.cancel")}
        @confirm=${this._confirmUpdate}
        @cancel=${() => (this.showConfirmDialog = false)}
      >
        <p>${this.t("confirmations.updateEmployee.message")}</p>
      </app-dialog>
    `;
	}

	_renderError() {
		return html`
      <div class="page-header">
        <a href=${ROUTES.EMPLOYEES} class="back-link" @click=${this._handleBackClick}>
          <app-icon name="arrow-left" size="small"></app-icon>
          ${this.t("nav.employees")}
        </a>
      </div>

      <div class="error-state">
        <app-icon name="alert-circle" size="64" class="error-state__icon"></app-icon>
        <h2 class="error-state__title">${this.t("errors.employeeNotFound")}</h2>
        <p class="error-state__text">${this.t("errors.employeeNotFoundMessage")}</p>
        <app-button variant="primary" @click=${() => navigateTo(ROUTES.EMPLOYEES)}>
          ${this.t("common.backToList")}
        </app-button>
      </div>
    `;
	}

	_handleBackClick(e) {
		e.preventDefault();
		navigateTo(ROUTES.EMPLOYEES);
	}

	_handleSubmit(e) {
		this.pendingData = e.detail.data;
		this.showConfirmDialog = true;
	}

	async _confirmUpdate() {
		if (!this.pendingData) return;

		this.showConfirmDialog = false;
		this.loading = true;

		const form = this.shadowRoot.querySelector("employee-form");
		if (form) {
			form.setLoading(true);
		}

		const result = await stateManager.updateEmployee(
			this.employeeId,
			this.pendingData,
		);

		this.loading = false;
		if (form) {
			form.setLoading(false);
		}

		if (result.success) {
			navigateTo(ROUTES.EMPLOYEES);
		} else {
			console.error("Error updating employee:", result.error);
		}

		this.pendingData = null;
	}

	_handleCancel() {
		navigateTo(ROUTES.EMPLOYEES);
	}
}

customElements.define("employee-edit-page", EmployeeEditPage);
