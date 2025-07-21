import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "./employee-form.js";

describe("EmployeeForm", () => {
	it("renders empty form for new employee", async () => {
		const el = await fixture(html`<employee-form></employee-form>`);

		const inputs = el.shadowRoot.querySelectorAll("app-input");
		expect(inputs).to.have.lengthOf(6);

		const selects = el.shadowRoot.querySelectorAll("select");
		expect(selects).to.have.lengthOf(2);
	});

	it("populates form with employee data for editing", async () => {
		const employee = {
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

		const el = await fixture(html`
      <employee-form .employee=${employee}></employee-form>
    `);

		await el.updateComplete;

		expect(el.formData.firstName).to.equal("John");
		expect(el.formData.lastName).to.equal("Doe");
		expect(el.formData.email).to.equal("john@example.com");
	});

	it("validates required fields", async () => {
		const el = await fixture(html`<employee-form></employee-form>`);

		const form = el.shadowRoot.querySelector("form");
		form.dispatchEvent(new Event("submit", { preventDefault: () => {} }));

		await el.updateComplete;

		expect(el.errors).to.have.property("firstName");
		expect(el.errors).to.have.property("lastName");
	});

	it("fires submit event with valid data", async () => {
		const submitHandler = sinon.spy();
		const el = await fixture(html`
    <employee-form @submit=${submitHandler}></employee-form>
  `);

		el.formData = {
			firstName: "John",
			lastName: "Doe",
			email: "john@example.com",
			phone: "+90 555 123 45 67",
			dateOfBirth: "1990-01-01",
			dateOfEmployment: "2023-01-01",
			department: "Tech",
			position: "Senior",
		};

		await el.updateComplete;

		const submitButton = el.shadowRoot.querySelector(
			'app-button[type="submit"]',
		);
		submitButton.click();

		expect(submitHandler).to.have.been.calledOnce;
		expect(submitHandler.args[0][0].detail.data).to.deep.include({
			firstName: "John",
			lastName: "Doe",
		});
	});

	it("fires cancel event", async () => {
		const cancelHandler = sinon.spy();
		const el = await fixture(html`
			<employee-form @cancel=${cancelHandler}></employee-form>
		`);

		const cancelBtn = el.shadowRoot.querySelector(
			'app-button[variant="ghost"]',
		);

		const actualButton = cancelBtn.shadowRoot.querySelector("button");
		actualButton.click();

		expect(cancelHandler).to.have.been.calledOnce;
	});
});
