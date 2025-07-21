import { LitElement, html } from "lit";
import { employeeTableStyles } from "./employee-table.styles.js";
import { I18nMixin } from "@utils/i18n-mixin.js";
import "@shared/icon/icon.js";
import "@shared/button/button.js";

/**
 * @element employee-table
 * @fires edit - Fired when edit button is clicked
 * @fires delete - Fired when delete button is clicked
 * @fires sort - Fired when column header is clicked
 *
 * @prop {Array} employees - Array of employee objects
 * @prop {String} sortBy - Current sort field
 * @prop {String} sortOrder - Current sort order (asc/desc)
 */
export class EmployeeTable extends I18nMixin(LitElement) {
	static styles = [employeeTableStyles];

	static properties = {
		employees: { type: Array },
		sortBy: { type: String },
		sortOrder: { type: String },
		selectedIds: { type: Array },
	};

	constructor() {
		super();
		this.employees = [];
		this.sortBy = "firstName";
		this.sortOrder = "asc";
		this.selectedIds = [];
	}

	render() {
		return html`
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th class="table__checkbox-cell">
                <input 
                  type="checkbox"
                  class="table__checkbox"
                  @change=${this._handleSelectAll}
                  .checked=${this._isAllSelected()}
                />
              </th>
              ${this._renderSortableHeader("firstName", this.t("employee.firstName"))}
              ${this._renderSortableHeader("lastName", this.t("employee.lastName"))}
              ${this._renderSortableHeader("dateOfEmployment", this.t("employee.dateOfEmployment"))}
              ${this._renderSortableHeader("dateOfBirth", this.t("employee.dateOfBirth"))}
              <th>${this.t("employee.phone")}</th>
              <th>${this.t("employee.email")}</th>
              ${this._renderSortableHeader("department", this.t("employee.department"))}
              ${this._renderSortableHeader("position", this.t("employee.position"))}
              <th class="table__actions-header">${this.t("common.actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${
							this.employees.length === 0
								? html`
              <tr>
                <td colspan="10" class="table__empty">
                  ${this.t("emptyStates.noEmployees")}
                </td>
              </tr>
            `
								: this.employees.map(
										(employee) => html`
              <tr class="${this.selectedIds.includes(employee.id) ? "selected" : ""}">
                <td class="table__checkbox-cell">
                  <input 
                    type="checkbox"
                    class="table__checkbox"
                    .checked=${this.selectedIds.includes(employee.id)}
                    @change=${(e) => this._handleSelectOne(employee.id, e.target.checked)}
                  />
                </td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${this._formatDate(employee.dateOfEmployment)}</td>
                <td>${this._formatDate(employee.dateOfBirth)}</td>
                <td>${employee.phone}</td>
                <td>
                  <a href="mailto:${employee.email}" class="table__link">
                    ${employee.email}
                  </a>
                </td>
                <td>
                  <span class="table__badge table__badge--department">
                    ${this.t(`departments.${employee.department.toLowerCase()}`)}
                  </span>
                </td>
                <td>
                  <span class="table__badge table__badge--position">
                    ${this.t(`positions.${employee.position.toLowerCase()}`)}
                  </span>
                </td>
                <td class="table__actions">
                  <button 
                    class="table__action"
                    @click=${() => this._handleEdit(employee)}
                    title=${this.t("tooltips.editEmployee")}
                  >
                    <app-icon name="edit" size="small" color="var(--color-primary)"></app-icon>
                  </button>
                  <button 
                    class="table__action"
                    @click=${() => this._handleDelete(employee)}
                    title=${this.t("tooltips.deleteEmployee")}
                  >
                    <app-icon name="delete" size="small" color="var(--color-error)"></app-icon>
                  </button>
                </td>
              </tr>
            `,
									)
						}
          </tbody>
        </table>
      </div>
    `;
	}

	_renderSortableHeader(field, label) {
		const isActive = this.sortBy === field;
		const nextOrder = isActive && this.sortOrder === "asc" ? "desc" : "asc";

		return html`
      <th 
        class="table__sortable ${isActive ? "active" : ""}"
        @click=${() => this._handleSort(field)}
      >
        <span>${label}</span>
        <app-icon 
          name=${this.sortOrder === "asc" ? "chevron-up" : "chevron-down"} 
          size="14"
          style="opacity: ${isActive ? "1" : "0.3"}"
        ></app-icon>
      </th>
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

	_isAllSelected() {
		return (
			this.employees.length > 0 &&
			this.selectedIds.length === this.employees.length
		);
	}

	_handleSelectAll(e) {
		if (e.target.checked) {
			this.selectedIds = this.employees.map((emp) => emp.id);
		} else {
			this.selectedIds = [];
		}
		this.requestUpdate();
	}

	_handleSelectOne(id, checked) {
		if (checked) {
			this.selectedIds = [...this.selectedIds, id];
		} else {
			this.selectedIds = this.selectedIds.filter(
				(selectedId) => selectedId !== id,
			);
		}
		this.requestUpdate();
	}

	_handleSort(field) {
		this.dispatchEvent(
			new CustomEvent("sort", {
				detail: { field },
				bubbles: true,
				composed: true,
			}),
		);
	}

	_handleEdit(employee) {
		this.dispatchEvent(
			new CustomEvent("edit", {
				detail: { employee },
				bubbles: true,
				composed: true,
			}),
		);
	}

	_handleDelete(employee) {
		this.dispatchEvent(
			new CustomEvent("delete", {
				detail: { employee },
				bubbles: true,
				composed: true,
			}),
		);
	}
}

customElements.define("employee-table", EmployeeTable);
