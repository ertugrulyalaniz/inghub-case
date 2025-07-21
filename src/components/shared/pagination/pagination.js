import { LitElement, html } from "lit";
import { paginationStyles } from "./pagination.styles.js";
import { I18nMixin } from "@utils/i18n-mixin.js";

/**
 * @element app-pagination
 * @fires page-change - Fired when page changes
 * @fires items-per-page-change - Fired when items per page changes
 *
 * @prop {Number} currentPage - Current page number (1-based)
 * @prop {Number} totalItems - Total number of items
 * @prop {Number} itemsPerPage - Items per page
 * @prop {Array} pageSizeOptions - Available page size options
 * @prop {Boolean} showPageSize - Show page size selector
 * @prop {Boolean} showInfo - Show pagination info
 * @prop {Boolean} compact - Compact mode (mobile)
 */
export class AppPagination extends I18nMixin(LitElement) {
	static styles = [paginationStyles];

	static properties = {
		currentPage: { type: Number },
		totalItems: { type: Number },
		itemsPerPage: { type: Number },
		pageSizeOptions: { type: Array },
		showPageSize: { type: Boolean },
		showInfo: { type: Boolean },
		compact: { type: Boolean },
	};

	constructor() {
		super();
		this.currentPage = 1;
		this.totalItems = 0;
		this.itemsPerPage = 10;
		this.pageSizeOptions = [10, 25, 50, 100];
		this.showPageSize = true;
		this.showInfo = true;
		this.compact = false;
	}

	get totalPages() {
		return Math.ceil(this.totalItems / this.itemsPerPage) || 1;
	}

	get startItem() {
		return (this.currentPage - 1) * this.itemsPerPage + 1;
	}

	get endItem() {
		return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
	}

	render() {
		return html`
      <div class="pagination ${this.compact ? "pagination--compact" : ""}">
        ${this.showInfo && !this.compact ? this._renderInfo() : ""}
        ${this._renderPages()}
        ${this.showPageSize && !this.compact ? this._renderPageSize() : ""}
      </div>
    `;
	}

	_renderInfo() {
		if (this.totalItems === 0) {
			return html`<div class="pagination__info">${this.t("pagination.noItems")}</div>`;
		}

		return html`
      <div class="pagination__info">
        ${this.t("pagination.showing")} ${this.startItem} ${this.t("pagination.to")} ${this.endItem} 
        ${this.t("pagination.of")} ${this.totalItems} ${this.t("pagination.items")}
      </div>
    `;
	}

	_renderPages() {
		const pages = this._getPageNumbers();

		return html`
      <div class="pagination__pages">
        ${this._renderNavButton("first", 1, this.currentPage === 1)}
        ${this._renderNavButton("previous", this.currentPage - 1, this.currentPage === 1)}
        
        ${
					this.compact
						? this._renderCompactPages()
						: pages.map((page) =>
								page === "..."
									? html`<span class="pagination__ellipsis">...</span>`
									: this._renderPageButton(page),
							)
				}
        
        ${this._renderNavButton("next", this.currentPage + 1, this.currentPage === this.totalPages)}
        ${this._renderNavButton("last", this.totalPages, this.currentPage === this.totalPages)}
      </div>
    `;
	}

	_renderCompactPages() {
		return html`
      <span class="pagination__compact-info">
        ${this.currentPage} ${this.t("pagination.of")} ${this.totalPages}
      </span>
    `;
	}

	_renderPageButton(page) {
		const isActive = page === this.currentPage;

		return html`
      <button
        class="pagination__page ${isActive ? "pagination__page--active" : ""}"
        @click=${() => this._handlePageChange(page)}
        ?disabled=${isActive}
        aria-label="${this.t("pagination.page")} ${page}"
        aria-current=${isActive ? "page" : "false"}
      >
        ${page}
      </button>
    `;
	}

	_renderNavButton(type, page, disabled) {
		const icons = {
			first: html`<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.5 12L7.5 8L11.5 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M4.5 4V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
			previous: html`<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
			next: html`<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
			last: html`<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4.5 12L8.5 8L4.5 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M11.5 4V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
		};

		const showLabels =
			!this.compact && (type === "previous" || type === "next");

		return html`
      <button
        class="pagination__nav pagination__nav--${type}"
        @click=${() => this._handlePageChange(page)}
        ?disabled=${disabled}
        aria-label=${this.t(`pagination.${type}`)}
      >
        ${type === "previous" || type === "first" ? icons[type] : ""}
        ${showLabels ? html`<span>${this.t(`pagination.${type}`)}</span>` : ""}
        ${type === "next" || type === "last" ? icons[type] : ""}
      </button>
    `;
	}

	_renderPageSize() {
		return html`
      <div class="pagination__size">
        <label for="page-size" class="pagination__size-label">
          ${this.t("pagination.itemsPerPage")}:
        </label>
        <select
          id="page-size"
          class="pagination__size-select"
          .value=${this.itemsPerPage}
          @change=${this._handlePageSizeChange}
        >
          ${this.pageSizeOptions.map(
						(size) => html`
            <option value=${size}>${size}</option>
          `,
					)}
        </select>
      </div>
    `;
	}

	_getPageNumbers() {
		const pages = [];
		const maxVisible = 7;
		const halfVisible = Math.floor(maxVisible / 2);

		if (this.totalPages <= maxVisible) {
			for (let i = 1; i <= this.totalPages; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);

			if (this.currentPage <= halfVisible + 1) {
				for (let i = 2; i <= maxVisible - 1; i++) {
					pages.push(i);
				}
				pages.push("...");
			} else if (this.currentPage >= this.totalPages - halfVisible) {
				pages.push("...");
				for (
					let i = this.totalPages - maxVisible + 2;
					i <= this.totalPages - 1;
					i++
				) {
					pages.push(i);
				}
			} else {
				pages.push("...");
				for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
					pages.push(i);
				}
				pages.push("...");
			}

			pages.push(this.totalPages);
		}

		return pages;
	}

	_handlePageChange(page) {
		if (page < 1 || page > this.totalPages || page === this.currentPage) {
			return;
		}

		this.currentPage = page;
		this.dispatchEvent(
			new CustomEvent("page-change", {
				detail: { page: this.currentPage },
				bubbles: true,
				composed: true,
			}),
		);
	}

	_handlePageSizeChange(e) {
		const newSize = parseInt(e.target.value);
		const currentFirstItem = this.startItem;

		this.itemsPerPage = newSize;

		this.currentPage = Math.ceil(currentFirstItem / newSize);

		this.dispatchEvent(
			new CustomEvent("items-per-page-change", {
				detail: {
					itemsPerPage: this.itemsPerPage,
					currentPage: this.currentPage,
				},
				bubbles: true,
				composed: true,
			}),
		);
	}

	goToPage(page) {
		this._handlePageChange(page);
	}

	nextPage() {
		this._handlePageChange(this.currentPage + 1);
	}

	previousPage() {
		this._handlePageChange(this.currentPage - 1);
	}

	firstPage() {
		this._handlePageChange(1);
	}

	lastPage() {
		this._handlePageChange(this.totalPages);
	}
}

customElements.define("app-pagination", AppPagination);
