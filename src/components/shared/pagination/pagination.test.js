import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "./pagination.js";

describe("AppPagination", () => {
	it("renders with default properties", async () => {
		const el = await fixture(html`
      <app-pagination totalItems="100"></app-pagination>
    `);

		expect(el).to.exist;
		expect(el.currentPage).to.equal(1);
		expect(el.itemsPerPage).to.equal(10);
		expect(el.totalPages).to.equal(10);
	});

	it("calculates correct page info", async () => {
		const el = await fixture(html`
      <app-pagination 
        totalItems="95" 
        currentPage="3" 
        itemsPerPage="10"
      ></app-pagination>
    `);

		expect(el.startItem).to.equal(21);
		expect(el.endItem).to.equal(30);
		expect(el.totalPages).to.equal(10);
	});

	it("renders page buttons correctly", async () => {
		const el = await fixture(html`
      <app-pagination totalItems="50" itemsPerPage="10"></app-pagination>
    `);

		const pageButtons = el.shadowRoot.querySelectorAll(".pagination__page");
		expect(pageButtons.length).to.equal(5);
	});

	it("highlights active page", async () => {
		const el = await fixture(html`
      <app-pagination totalItems="50" currentPage="3"></app-pagination>
    `);

		const activeButton = el.shadowRoot.querySelector(
			".pagination__page--active",
		);
		expect(activeButton).to.exist;
		expect(activeButton.textContent.trim()).to.equal("3");
	});

	it("handles page change", async () => {
		const pageChangeHandler = sinon.spy();
		const el = await fixture(html`
      <app-pagination 
        totalItems="50" 
        @page-change=${pageChangeHandler}
      ></app-pagination>
    `);

		const pageButton = el.shadowRoot.querySelectorAll(".pagination__page")[2];
		pageButton.click();

		expect(pageChangeHandler).to.have.been.calledOnce;
		expect(pageChangeHandler.args[0][0].detail.page).to.equal(3);
		expect(el.currentPage).to.equal(3);
	});

	it("disables navigation buttons appropriately", async () => {
		const el = await fixture(html`
      <app-pagination totalItems="50" currentPage="1"></app-pagination>
    `);

		const firstButton = el.shadowRoot.querySelector(".pagination__nav--first");
		const previousButton = el.shadowRoot.querySelector(
			".pagination__nav--previous",
		);

		expect(firstButton).to.have.attribute("disabled");
		expect(previousButton).to.have.attribute("disabled");
	});

	it("handles page size change", async () => {
		const sizeChangeHandler = sinon.spy();
		const el = await fixture(html`
      <app-pagination 
        totalItems="100" 
        @items-per-page-change=${sizeChangeHandler}
      ></app-pagination>
    `);

		const select = el.shadowRoot.querySelector(".pagination__size-select");
		select.value = "25";
		select.dispatchEvent(new Event("change"));

		expect(sizeChangeHandler).to.have.been.calledOnce;
		expect(sizeChangeHandler.args[0][0].detail.itemsPerPage).to.equal(25);
		expect(el.itemsPerPage).to.equal(25);
	});

	it("renders ellipsis for many pages", async () => {
		const el = await fixture(html`
      <app-pagination totalItems="1000" currentPage="10"></app-pagination>
    `);

		const ellipsis = el.shadowRoot.querySelector(".pagination__ellipsis");
		expect(ellipsis).to.exist;
	});

	it("renders in compact mode", async () => {
		const el = await fixture(html`
      <app-pagination totalItems="100" compact></app-pagination>
    `);

		const compactInfo = el.shadowRoot.querySelector(
			".pagination__compact-info",
		);
		expect(compactInfo).to.exist;
		expect(compactInfo.textContent).to.include("1");
		expect(compactInfo.textContent).to.include("10");
	});

	it("provides public navigation methods", async () => {
		const el = await fixture(html`
      <app-pagination totalItems="100"></app-pagination>
    `);

		el.nextPage();
		expect(el.currentPage).to.equal(2);

		el.lastPage();
		expect(el.currentPage).to.equal(10);

		el.previousPage();
		expect(el.currentPage).to.equal(9);

		el.firstPage();
		expect(el.currentPage).to.equal(1);

		el.goToPage(5);
		expect(el.currentPage).to.equal(5);
	});

	it("handles empty state", async () => {
		const el = await fixture(html`
      <app-pagination totalItems="0"></app-pagination>
    `);

		expect(el.totalPages).to.equal(1);
		const info = el.shadowRoot.querySelector(".pagination__info");
		expect(info).to.exist;
	});
});
