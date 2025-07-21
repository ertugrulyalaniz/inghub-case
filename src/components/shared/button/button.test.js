import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "./button.js";

describe("AppButton", () => {
	afterEach(() => {
		sinon.restore();
	});

	it("renders with default properties", async () => {
		const el = await fixture(html`<app-button>Click me</app-button>`);

		await el.updateComplete;

		expect(el).to.exist;
		const button = el.shadowRoot.querySelector("button");
		expect(button).to.exist;
		expect(button).to.have.class("btn");
		expect(button).to.have.class("btn--primary");
		expect(button.type).to.equal("button");
	});

	it("renders different variants", async () => {
		const el = await fixture(html`
      <app-button variant="secondary">Secondary</app-button>
    `);

		await el.updateComplete;

		const button = el.shadowRoot.querySelector("button");
		expect(button).to.have.class("btn--secondary");
	});

	it("renders different sizes", async () => {
		const el = await fixture(html`
      <app-button size="small">Small</app-button>
    `);

		await el.updateComplete;

		const button = el.shadowRoot.querySelector("button");
		expect(button).to.have.class("btn--small");
	});

	it("handles disabled state", async () => {
		const el = await fixture(html`
      <app-button disabled>Disabled</app-button>
    `);

		await el.updateComplete;

		const button = el.shadowRoot.querySelector("button");
		expect(button).to.have.attribute("disabled");
	});

	it("handles click events", async () => {
		const el = await fixture(html`
      <app-button>Click</app-button>
    `);

		await el.updateComplete;

		const clickPromise = new Promise((resolve) => {
			el.addEventListener("click", resolve);
		});

		const button = el.shadowRoot.querySelector("button");
		button.click();

		const event = await clickPromise;
		expect(event).to.exist;
	});

	it("renders as block button", async () => {
		const el = await fixture(html`
      <app-button block>Block Button</app-button>
    `);

		await el.updateComplete;

		const button = el.shadowRoot.querySelector("button");
		expect(button).to.have.class("btn--block");
	});

	it("renders as icon button", async () => {
		const el = await fixture(html`
      <app-button icon>🔍</app-button>
    `);

		await el.updateComplete;

		const button = el.shadowRoot.querySelector("button");
		expect(button).to.have.class("btn--icon");
	});

	it("applies correct classes for all properties", async () => {
		const el = await fixture(html`
      <app-button 
        variant="danger" 
        size="large" 
        loading 
        block 
        icon
      >
        Test
      </app-button>
    `);

		await el.updateComplete;

		const button = el.shadowRoot.querySelector("button");
		expect(button).to.have.class("btn");
		expect(button).to.have.class("btn--danger");
		expect(button).to.have.class("btn--large");
		expect(button).to.have.class("btn--loading");
		expect(button).to.have.class("btn--block");
		expect(button).to.have.class("btn--icon");
	});

	it("sets correct button type", async () => {
		const el = await fixture(html`
      <app-button type="submit">Submit</app-button>
    `);

		await el.updateComplete;

		const button = el.shadowRoot.querySelector("button");
		expect(button.type).to.equal("submit");
	});

	it("renders slot content correctly", async () => {
		const el = await fixture(html`
      <app-button><span class="custom-content">Custom Content</span></app-button>
    `);

		await el.updateComplete;

		const slot = el.shadowRoot.querySelector("slot");
		expect(slot).to.exist;

		const assignedElements = slot.assignedElements();
		expect(assignedElements.length).to.equal(1);
		expect(assignedElements[0].classList.contains("custom-content")).to.be.true;
	});
});
