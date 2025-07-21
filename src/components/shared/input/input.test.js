import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";

import "./input.js";

describe("AppInput", () => {
	afterEach(() => {
		sinon.restore();
	});

	it("renders with default properties", async () => {
		const el = await fixture(html`<app-input></app-input>`);

		await el.updateComplete;

		expect(el).to.exist;
		const input = el.shadowRoot.querySelector("input");
		expect(input).to.exist;
		expect(input.type).to.equal("text");
		expect(el.value).to.equal("");
	});

	it("renders with label", async () => {
		const el = await fixture(html`
      <app-input label="Email Address"></app-input>
    `);

		await el.updateComplete;

		const label = el.shadowRoot.querySelector(".form-label");
		expect(label).to.exist;
		expect(label.textContent.trim()).to.equal("Email Address");
	});

	it("shows required indicator", async () => {
		const el = await fixture(html`
      <app-input label="Email" required></app-input>
    `);

		await el.updateComplete;

		const label = el.shadowRoot.querySelector(".form-label");
		expect(label).to.exist;
		expect(label).to.have.class("required");
	});

	it("handles value changes via input event", async () => {
		const el = await fixture(html`<app-input></app-input>`);

		await el.updateComplete;

		let eventDetail;
		el.addEventListener("input", (e) => {
			eventDetail = e.detail;
		});

		const input = el.shadowRoot.querySelector("input");

		input.value = "test@example.com";
		input.dispatchEvent(new Event("input", { bubbles: true }));

		await el.updateComplete;

		expect(el.value).to.equal("test@example.com");
		expect(eventDetail).to.exist;
		expect(eventDetail.value).to.equal("test@example.com");
	});

	it("validates email format", async () => {
		const el = await fixture(html`
      <app-input type="email" required></app-input>
    `);

		await el.updateComplete;

		el.value = "invalid-email";
		const isValid = el.validate();

		expect(isValid).to.be.false;
		expect(el.error).to.exist;

		expect(el.error.toLowerCase()).to.include("email");
	});

	it("validates required fields", async () => {
		const el = await fixture(html`<app-input required></app-input>`);

		await el.updateComplete;

		el.value = "";
		const isValid = el.validate();

		expect(isValid).to.be.false;
		expect(el.error).to.exist;
	});

	it("validates phone number format", async () => {
		const el = await fixture(html`
      <app-input type="tel"></app-input>
    `);

		await el.updateComplete;

		el.value = "123";
		let isValid = el.validate();
		expect(isValid).to.be.true;

		el.value = "+90 532 123 45 67";
		isValid = el.validate();
		expect(isValid).to.be.true;

		el.value = "(555) 123-4567";
		isValid = el.validate();
		expect(isValid).to.be.true;

		el.value = "abc123";
		isValid = el.validate();
		expect(isValid).to.be.false;
		expect(el.error).to.exist;
	});

	it("shows character count when maxlength is set", async () => {
		const el = await fixture(html`
      <app-input maxlength="10" value="Hello"></app-input>
    `);

		await el.updateComplete;

		const charCount = el.shadowRoot.querySelector(".char-count");
		expect(charCount).to.exist;
		expect(charCount.textContent.trim()).to.equal("5/10");
	});

	it("shows over-limit class when exceeding maxlength", async () => {
		const el = await fixture(html`
      <app-input maxlength="5"></app-input>
    `);

		await el.updateComplete;

		el.value = "Hello World";
		await el.updateComplete;

		const charCount = el.shadowRoot.querySelector(".char-count");
		expect(charCount).to.have.class("over-limit");
	});

	it("handles disabled state", async () => {
		const el = await fixture(html`<app-input disabled></app-input>`);

		await el.updateComplete;

		const input = el.shadowRoot.querySelector("input");
		expect(input).to.have.attribute("disabled");
	});

	it("handles readonly state", async () => {
		const el = await fixture(html`<app-input readonly></app-input>`);

		await el.updateComplete;

		const input = el.shadowRoot.querySelector("input");
		expect(input).to.have.attribute("readonly");
	});

	it("fires enter event on Enter key", async () => {
		const el = await fixture(html`<app-input></app-input>`);

		await el.updateComplete;

		const enterEventPromise = new Promise((resolve) => {
			el.addEventListener("enter", (e) => {
				resolve(e.detail);
			});
		});

		const input = el.shadowRoot.querySelector("input");
		input.value = "test value";

		const event = new KeyboardEvent("keydown", {
			key: "Enter",
			bubbles: true,
		});
		input.dispatchEvent(event);

		const eventDetail = await enterEventPromise;
		expect(eventDetail.value).to.equal("test value");
	});

	it("shows error message when not focused", async () => {
		const el = await fixture(html`
      <app-input error="Invalid input"></app-input>
    `);

		await el.updateComplete;

		const error = el.shadowRoot.querySelector(".form-error");
		expect(error).to.exist;
		expect(error.textContent).to.equal("Invalid input");
	});

	it("hides error message when focused", async () => {
		const el = await fixture(html`
      <app-input error="Invalid input"></app-input>
    `);

		await el.updateComplete;

		const input = el.shadowRoot.querySelector("input");
		input.focus();
		el._handleFocus();
		await el.updateComplete;

		const error = el.shadowRoot.querySelector(".form-error");
		expect(error).to.not.exist;
	});

	it("shows hint message", async () => {
		const el = await fixture(html`
      <app-input hint="Enter your email"></app-input>
    `);

		await el.updateComplete;

		const hint = el.shadowRoot.querySelector(".form-hint");
		expect(hint).to.exist;
		expect(hint.textContent).to.equal("Enter your email");
	});

	it("validates minlength", async () => {
		const el = await fixture(html`
      <app-input minlength="5"></app-input>
    `);

		await el.updateComplete;

		el.value = "Hi";
		let isValid = el.validate();
		expect(isValid).to.be.false;
		expect(el.error).to.exist;

		el.value = "Hello";
		isValid = el.validate();
		expect(isValid).to.be.true;
		expect(el.error).to.equal("");
	});

	it("validates pattern", async () => {
		const el = await fixture(html`
      <app-input pattern="[A-Z]{3}"></app-input>
    `);

		await el.updateComplete;

		el.value = "abc";
		let isValid = el.validate();
		expect(isValid).to.be.false;

		el.value = "ABC";
		isValid = el.validate();
		expect(isValid).to.be.true;
	});

	it("handles change event with validation", async () => {
		const el = await fixture(html`
      <app-input type="email"></app-input>
    `);

		await el.updateComplete;

		let eventDetail;
		el.addEventListener("change", (e) => {
			eventDetail = e.detail;
		});

		const input = el.shadowRoot.querySelector("input");

		input.value = "test@example.com";
		input.dispatchEvent(new Event("change", { bubbles: true }));

		await el.updateComplete;

		expect(el.value).to.equal("test@example.com");
		expect(eventDetail).to.exist;
		expect(eventDetail.value).to.equal("test@example.com");
	});

	it("autofocuses when autofocus is set", async () => {
		const el = await fixture(html`
      <app-input autofocus></app-input>
    `);

		await el.updateComplete;

		const input = el.shadowRoot.querySelector("input");
		expect(input).to.exist;
	});

	it("reset method clears value and error", async () => {
		const el = await fixture(html`
      <app-input value="test" error="Some error"></app-input>
    `);

		await el.updateComplete;

		expect(el.value).to.equal("test");
		expect(el.error).to.equal("Some error");

		el.reset();
		await el.updateComplete;

		expect(el.value).to.equal("");
		expect(el.error).to.equal("");
		expect(el._focused).to.be.false;
	});

	it("focus method focuses the input", async () => {
		const el = await fixture(html`<app-input></app-input>`);

		await el.updateComplete;

		const input = el.shadowRoot.querySelector("input");
		const focusSpy = sinon.spy(input, "focus");

		el.focus();

		expect(focusSpy).to.have.been.calledOnce;
	});

	it("handles all input types correctly", async () => {
		const types = ["text", "email", "tel", "password", "date", "number"];

		for (const type of types) {
			const el = await fixture(html`<app-input type="${type}"></app-input>`);
			await el.updateComplete;

			const input = el.shadowRoot.querySelector("input");
			expect(input.type).to.equal(type);
		}
	});

	it("validates on blur", async () => {
		const el = await fixture(html`
      <app-input type="email" required></app-input>
    `);

		await el.updateComplete;

		const input = el.shadowRoot.querySelector("input");

		input.value = "invalid-email";
		el.value = "invalid-email";

		el._handleBlur();
		await el.updateComplete;

		expect(el.error).to.exist;
		expect(el._focused).to.be.false;
	});
});
