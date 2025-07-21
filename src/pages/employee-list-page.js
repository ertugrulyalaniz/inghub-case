import { LitElement, html, css } from "lit";
import { I18nMixin } from "@utils/i18n-mixin.js";
import { stateManager } from "@services/state-manager.js";
import { navigateTo } from "../router.js";
import { getEditRoute } from "@config/routes.js";
import { VIEW_MODES } from "@config/constants.js";
import "@components/employee/employee-table/employee-table.js";
import "@components/employee/employee-card/employee-card.js";
import "@shared/pagination/pagination.js";
import "@shared/input/input.js";
import "@shared/button/button.js";
import "@shared/icon/icon.js";
import "@shared/dialog/dialog.js";

export class EmployeeListPage extends I18nMixin(LitElement) {
	static styles = css`
    :host {
      display: block;
    }

    .page-title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary);
      margin: 0 0 var(--spacing-2) 0;
    }

    .page-subtitle {
      color: var(--color-gray-600);
      margin: 0;
    }

    .controls {
      display: flex;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-4);
      flex-wrap: wrap;
      align-items: center;
    }

    .controls__left {
      display: flex;
      gap: var(--spacing-3);
      flex: 1;
      align-items: center;
    }

    .controls__right {
      display: flex;
      gap: var(--spacing-3);
      align-items: center;
    }
    
    .view-toggle {
      display: flex;
      background-color: var(--color-gray-100);
      border-radius: var(--radius-md);
      padding: 2px;
    }

    .view-toggle__button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-2) var(--spacing-3);
      border: none;
      background: none;
      color: var(--color-gray-600);
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: all var(--transition-fast);
    }

    .view-toggle__button.active {
      background-color: var(--color-white);
      color: var(--color-gray-900);
      box-shadow: var(--shadow-sm);
    }

    .content {
      margin-bottom: var(--spacing-6);
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: var(--spacing-4);
    }

    .empty-state {
      text-align: center;
      padding: var(--spacing-12) var(--spacing-4);
      background-color: var(--color-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-base);
    }

    .empty-state__icon {
      color: var(--color-gray-400);
      margin-bottom: var(--spacing-4);
    }

    .empty-state__title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-900);
      margin: 0 0 var(--spacing-2) 0;
    }

    .empty-state__text {
      color: var(--color-gray-600);
      margin: 0 0 var(--spacing-6) 0;
    }

    /* Mobile styles */
    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }

      .controls__left,
      .controls__right {
        width: 100%;
      }

      .search-wrapper {
        max-width: none;
      }

      .card-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

	static properties = {
		employees: { type: Array },
		viewMode: { type: String },
		currentPage: { type: Number },
		itemsPerPage: { type: Number },
		sortBy: { type: String },
		sortOrder: { type: String },
		loading: { type: Boolean },
		showDeleteDialog: { type: Boolean },
		employeeToDelete: { type: Object },
	};

	constructor() {
		super();
		this.employees = [];

		this.viewMode = VIEW_MODES.TABLE;
		this.currentPage = 1;
		this.itemsPerPage = 9;
		this.sortBy = "firstName";
		this.sortOrder = "asc";
		this.loading = false;
		this.showDeleteDialog = false;
		this.employeeToDelete = null;
	}

	connectedCallback() {
		super.connectedCallback();

		this._unsubscribe = stateManager.subscribe(({ newState }) => {
			this.employees = newState.employees;
			this.viewMode = newState.viewMode;
			this.currentPage = newState.currentPage;
			this.itemsPerPage = newState.itemsPerPage;
			this.sortBy = newState.sortBy;
			this.sortOrder = newState.sortOrder;
			this.loading = newState.loading;
		});

		const state = stateManager.getState();
		this.employees = state.employees;
		this.viewMode = state.viewMode;
		this.currentPage = state.currentPage;
		this.itemsPerPage = state.itemsPerPage;
		this.sortBy = state.sortBy;
		this.sortOrder = state.sortOrder;
		this.loading = state.loading;
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		if (this._unsubscribe) {
			this._unsubscribe();
		}
	}

	render() {
		const paginatedEmployees = stateManager.getPaginatedEmployees();
		const totalPages = stateManager.getTotalPages();

		return html`
      
      <div class="controls">
        <div class="controls__left">
          <div class="page-header">
            <h1 class="page-title">${this.t("employee.employeeList")}</h1>
          </div>    
        </div>
        
        <div class="controls__right">
          <div class="view-toggle">
            <button
              class="view-toggle__button ${this.viewMode === VIEW_MODES.TABLE ? "active" : ""}"
              @click=${() => this._handleViewModeChange(VIEW_MODES.TABLE)}
              title=${this.t("tooltips.switchToTable")}
            >
              <app-icon name="list" size="small"></app-icon>
            </button>
            <button
              class="view-toggle__button ${this.viewMode === VIEW_MODES.LIST ? "active" : ""}"
              @click=${() => this._handleViewModeChange(VIEW_MODES.LIST)}
              title=${this.t("tooltips.switchToList")}
            >
              <app-icon name="grid" size="small"></app-icon>
            </button>
          </div>
        </div>
      </div>

      <div class="content">
        ${
					paginatedEmployees.length === 0
						? this._renderEmptyState()
						: this.viewMode === VIEW_MODES.TABLE
							? html`
              <employee-table
                .employees=${paginatedEmployees}
                .sortBy=${this.sortBy}
                .sortOrder=${this.sortOrder}
                @sort=${this._handleSort}
                @edit=${this._handleEdit}
                @delete=${this._handleDelete}
              ></employee-table>
            `
							: html`
              <div class="card-grid">
                ${paginatedEmployees.map(
									(employee) => html`
                  <employee-card
                    .employee=${employee}
                    @edit=${this._handleEdit}
                    @delete=${this._handleDelete}
                  ></employee-card>
                `,
								)}
              </div>
            `
				}
      </div>

      
        <app-pagination
          .currentPage=${this.currentPage}
          .totalItems=${this.employees.length}
          .itemsPerPage=${this.itemsPerPage}
          .pageSizeOptions=${[9, 18, 36, 72]}
          @page-change=${this._handlePageChange}
          @items-per-page-change=${this._handleItemsPerPageChange}
        ></app-pagination>
      

      <app-dialog
        ?open=${this.showDeleteDialog}
        title=${this.t("confirmations.deleteEmployee.title")}
        confirmText=${this.t("confirmations.deleteEmployee.confirm")}
        cancelText=${this.t("confirmations.deleteEmployee.cancel")}
        confirmVariant="danger"
        size="small"
        @confirm=${this._confirmDelete}
        @cancel=${() => (this.showDeleteDialog = false)}
      >
        <p>${this.t("confirmations.deleteEmployee.message", {
					name: this.employeeToDelete
						? `${this.employeeToDelete.firstName} ${this.employeeToDelete.lastName}`
						: "",
				})}</p>
      </app-dialog>
    `;
	}
	_renderEmptyState() {
		return html`
      <div class="empty-state">
        <app-icon 
          name="users" 
          size="64" 
          class="empty-state__icon"
        ></app-icon>
        <h2 class="empty-state__title">
          ${this.t("emptyStates.noEmployees")}
        </h2>
        <p class="empty-state__text">
          ${this.t("emptyStates.addFirstEmployee")}
        </p>
        <app-button variant="primary" @click=${() => navigateTo("/employees/add")}>
          <app-icon name="plus" size="small"></app-icon>
          ${this.t("nav.addEmployee")}
        </app-button>
      </div>
    `;
	}

	_handleViewModeChange(mode) {
		stateManager.setViewMode(mode);
	}

	_handleSort(e) {
		stateManager.setSort(e.detail.field);
	}

	_handlePageChange(e) {
		stateManager.setPage(e.detail.page);
	}

	_handleItemsPerPageChange(e) {
		stateManager.setItemsPerPage(e.detail.itemsPerPage);
	}

	_handleEdit(e) {
		const employeeId = e.detail.employee.id;
		navigateTo(getEditRoute(employeeId));
	}

	_handleDelete(e) {
		this.employeeToDelete = e.detail.employee;
		this.showDeleteDialog = true;
	}

	async _confirmDelete() {
		if (!this.employeeToDelete) return;

		this.showDeleteDialog = false;
		const result = await stateManager.deleteEmployee(this.employeeToDelete.id);

		if (result.success) {
			console.log(this.t("success.employeeDeleted"));
		} else {
			console.error(result.error);
		}

		this.employeeToDelete = null;
	}
}

customElements.define("employee-list-page", EmployeeListPage);
