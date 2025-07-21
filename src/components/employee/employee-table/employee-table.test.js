import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "./employee-table.js";

describe("EmployeeTable", () => {
	const mockEmployees = [
		{
			id: "1",
			firstName: "John",
			lastName: "Doe",
			email: "john@example.com",
			phone: "+90 555 123 45 67",
			dateOfBirth: "1990-01-01",
			dateOfEmployment: "2023-01-01",
			department: "Tech",
			position: "Senior",
		},
		{
			id: "2",
			firstName: "Jane",
			lastName: "Smith",
			email: "jane@example.com",
			phone: "+90 555 987 65 43",
			dateOfBirth: "1992-05-15",
			dateOfEmployment: "2022-03-20",
			department: "Analytics",
			position: "Junior",
		},
	];

	it("renders employees in table", async () => {
		const el = await fixture(html`
      <employee-table .employees=${mockEmployees}></employee-table>
    `);

		const rows = el.shadowRoot.querySelectorAll("tbody tr");
		expect(rows).to.have.lengthOf(2);

		const firstRowCells = rows[0].querySelectorAll("td");
		expect(firstRowCells[1].textContent).to.equal("John");
		expect(firstRowCells[2].textContent).to.equal("Doe");
	});

	it("shows empty state when no employees", async () => {
		const el = await fixture(html`
      <employee-table .employees=${[]}></employee-table>
    `);

		const emptyCell = el.shadowRoot.querySelector(".table__empty");
		expect(emptyCell).to.exist;
	});

	it("fires sort event on header click", async () => {
		const sortHandler = sinon.spy();
		const el = await fixture(html`
      <employee-table 
        .employees=${mockEmployees}
        @sort=${sortHandler}
      ></employee-table>
    `);

		const sortableHeader = el.shadowRoot.querySelector(".table__sortable");
		sortableHeader.click();

		expect(sortHandler).to.have.been.calledOnce;
		expect(sortHandler.args[0][0].detail.field).to.equal("firstName");
	});

	it("fires edit event", async () => {
		const editHandler = sinon.spy();
		const el = await fixture(html`
      <employee-table 
        .employees=${mockEmployees}
        @edit=${editHandler}
      ></employee-table>
    `);

		const editBtn = el.shadowRoot.querySelector(".table__action");
		editBtn.click();

		expect(editHandler).to.have.been.calledOnce;
		expect(editHandler.args[0][0].detail.employee).to.deep.equal(
			mockEmployees[0],
		);
	});

	it("handles row selection", async () => {
		const el = await fixture(html`
      <employee-table .employees=${mockEmployees}></employee-table>
    `);

		const firstCheckbox = el.shadowRoot.querySelectorAll(".table__checkbox")[1];
		firstCheckbox.click();

		await el.updateComplete;

		expect(el.selectedIds).to.include("1");
	});

	it("handles select all", async () => {
		const el = await fixture(html`
      <employee-table .employees=${mockEmployees}></employee-table>
    `);

		const selectAllCheckbox = el.shadowRoot.querySelector(".table__checkbox");
		selectAllCheckbox.click();

		await el.updateComplete;

		expect(el.selectedIds).to.have.lengthOf(2);
		expect(el.selectedIds).to.include("1");
		expect(el.selectedIds).to.include("2");
	});
});
