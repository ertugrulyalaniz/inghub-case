import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "./employee-card.js";

describe("EmployeeCard", () => {
	const mockEmployee = {
		id: "1",
		firstName: "John",
		lastName: "Doe",
		email: "john@example.com",
		phone: "+90 555 123 45 67",
		dateOfBirth: "1990-01-01",
		dateOfEmployment: "2023-01-01",
		department: "Tech",
		position: "Senior",
	};

	it("renders employee information", async () => {
		const el = await fixture(html`
      <employee-card .employee=${mockEmployee}></employee-card>
    `);

		await el.updateComplete;

		const name = el.shadowRoot.querySelector(".card__value");
		expect(name).to.exist;
		expect(name.textContent).to.include("John");

		const email = el.shadowRoot.querySelector(".card__email");
		expect(email).to.exist;
		expect(email.textContent).to.equal("john@example.com");
	});

	it("renders empty when no employee provided", async () => {
		const el = await fixture(html`<employee-card></employee-card>`);

		await el.updateComplete;

		const card = el.shadowRoot.querySelector(".card");
		expect(card).to.not.exist;
	});

	it("fires edit event", async () => {
		const editHandler = sinon.spy();
		const el = await fixture(html`
      <employee-card 
        .employee=${mockEmployee}
        @edit=${editHandler}
      ></employee-card>
    `);

		await el.updateComplete;

		const editBtn = el.shadowRoot.querySelector(".card__action");
		expect(editBtn).to.exist;
		editBtn.click();

		expect(editHandler).to.have.been.calledOnce;
		expect(editHandler.args[0][0].detail.employee).to.deep.equal(mockEmployee);
	});

	it("fires delete event", async () => {
		const deleteHandler = sinon.spy();
		const el = await fixture(html`
      <employee-card 
        .employee=${mockEmployee}
        @delete=${deleteHandler}
      ></employee-card>
    `);

		await el.updateComplete;

		const deleteBtn = el.shadowRoot.querySelectorAll(".card__action")[1];
		expect(deleteBtn).to.exist;
		deleteBtn.click();

		expect(deleteHandler).to.have.been.calledOnce;
		expect(deleteHandler.args[0][0].detail.employee).to.deep.equal(
			mockEmployee,
		);
	});

	it("formats dates correctly", async () => {
		const el = await fixture(html`
      <employee-card .employee=${mockEmployee}></employee-card>
    `);

		await el.updateComplete;

		const dateValues = el.shadowRoot.querySelectorAll(".card__value");
		expect(dateValues.length).to.be.greaterThan(0);
		const employmentDate = dateValues[2].textContent;

		expect(employmentDate).to.not.equal("2023-01-01");
		expect(employmentDate).to.include("2023");
	});
});
