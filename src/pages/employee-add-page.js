import { LitElement, html, css } from "lit";
import { I18nMixin } from "@utils/i18n-mixin.js";
import { stateManager } from "@services/state-manager.js";
import { navigateTo } from "../router.js";
import { ROUTES } from "@config/routes.js";
import "@components/employee/employee-form/employee-form.js";
import "@shared/dialog/dialog.js";

export class EmployeeAddPage extends I18nMixin(LitElement) {
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

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      color: var(--color-primary);
      text-decoration: none;
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-4);
      transition: all var(--transition-fast);
    }

    .back-link:hover {
      text-decoration: underline;
    }
  `;

	static properties = {
		loading: { type: Boolean },
		showSuccessDialog: { type: Boolean },
	};

	constructor() {
		super();
		this.loading = false;
		this.showSuccessDialog = false;
	}

	render() {
		return html`
      <div class="page-header">
        <h1 class="page-title">${this.t("employee.addEmployee")}</h1>
      </div>
      <employee-form
        @submit=${this._handleSubmit}
        @cancel=${this._handleCancel}
        ?loading=${this.loading}
      ></employee-form>

      <app-dialog
        ?open=${this.showSuccessDialog}
        title=${this.t("success.employeeAdded")}
        confirmText=${this.t("common.ok")}
        hideFooter
        size="small"
        @close=${() => navigateTo(ROUTES.EMPLOYEES)}
      >
        <p>${this.t("success.employeeAddedMessage")}</p>
      </app-dialog>
    `;
	}

	async _handleSubmit(e) {
		const { data } = e.detail;
		console.log("Submitting employee data:", data);

		this.loading = true;

		const form = this.shadowRoot.querySelector("employee-form");
		if (form) {
			form.setLoading(true);
		}

		try {
			const result = await stateManager.addEmployee(data);
			console.log("Add employee result:", result);

			this.loading = false;
			if (form) {
				form.setLoading(false);
			}

			if (result.success) {
				console.log("Employee added successfully!");
				setTimeout(() => {
					navigateTo(ROUTES.EMPLOYEES);
				}, 500);
			} else {
				console.error("Error adding employee:", result.error);
				alert(result.error || "Failed to add employee");
			}
		} catch (error) {
			console.error("Exception adding employee:", error);
			this.loading = false;
			if (form) {
				form.setLoading(false);
			}
		}
	}

	_handleCancel() {
		navigateTo(ROUTES.EMPLOYEES);
	}
}

customElements.define("employee-add-page", EmployeeAddPage);
