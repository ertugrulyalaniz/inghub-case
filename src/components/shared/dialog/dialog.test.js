import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "./dialog.js";

describe("AppDialog", () => {
	it("renders when open", async () => {
		const el = await fixture(html`
      <app-dialog open title="Test Dialog">
        <p>Dialog content</p>
      </app-dialog>
    `);

		const backdrop = el.shadowRoot.querySelector(".dialog-backdrop");
		expect(backdrop).to.exist;

		const title = el.shadowRoot.querySelector(".dialog__title");
		expect(title.textContent).to.equal("Test Dialog");
	});

	it("does not render when closed", async () => {
		const el = await fixture(html`
      <app-dialog title="Test Dialog">
        <p>Dialog content</p>
      </app-dialog>
    `);

		const backdrop = el.shadowRoot.querySelector(".dialog-backdrop");
		expect(backdrop).to.not.exist;
	});

	it("renders different sizes", async () => {
		const el = await fixture(html`
      <app-dialog open size="large">Content</app-dialog>
    `);

		const dialog = el.shadowRoot.querySelector(".dialog");
		expect(dialog).to.have.class("dialog--large");
	});

	it("closes on backdrop click when not modal", async () => {
		const closeHandler = sinon.spy();
		const el = await fixture(html`
      <app-dialog open @close=${closeHandler}>Content</app-dialog>
    `);

		const backdrop = el.shadowRoot.querySelector(".dialog-backdrop");
		backdrop.click();

		expect(closeHandler).to.have.been.calledOnce;
		expect(el.open).to.be.false;
	});

	it("does not close on backdrop click when modal", async () => {
		const closeHandler = sinon.spy();
		const el = await fixture(html`
      <app-dialog open modal @close=${closeHandler}>Content</app-dialog>
    `);

		const backdrop = el.shadowRoot.querySelector(".dialog-backdrop");
		backdrop.click();

		expect(closeHandler).to.not.have.been.called;
		expect(el.open).to.be.true;
	});

	it("fires confirm event", async () => {
		const confirmHandler = sinon.spy();
		const el = await fixture(html`
      <app-dialog open @confirm=${confirmHandler}>Content</app-dialog>
    `);

		const confirmBtn = el.shadowRoot.querySelector(".btn--primary");
		confirmBtn.click();

		expect(confirmHandler).to.have.been.calledOnce;
	});

	it("fires cancel event", async () => {
		const cancelHandler = sinon.spy();
		const el = await fixture(html`
      <app-dialog open @cancel=${cancelHandler}>Content</app-dialog>
    `);

		const cancelBtn = el.shadowRoot.querySelector(".btn--secondary");
		cancelBtn.click();

		expect(cancelHandler).to.have.been.calledOnce;
	});

	it("shows custom button text", async () => {
		const el = await fixture(html`
      <app-dialog 
        open 
        confirmText="Delete" 
        cancelText="Keep"
        confirmVariant="danger"
      >
        Content
      </app-dialog>
    `);

		const confirmBtn = el.shadowRoot.querySelector(".btn--danger");
		expect(confirmBtn.textContent.trim()).to.equal("Delete");

		const cancelBtn = el.shadowRoot.querySelector(".btn--secondary");
		expect(cancelBtn.textContent.trim()).to.equal("Keep");
	});

	it("hides footer when hideFooter is true", async () => {
		const el = await fixture(html`
      <app-dialog open hideFooter>Content</app-dialog>
    `);

		const footer = el.shadowRoot.querySelector(".dialog__footer");
		expect(footer).to.not.exist;
	});

	it("shows loading state", async () => {
		const el = await fixture(html`
      <app-dialog open loading>Content</app-dialog>
    `);

		const loader = el.shadowRoot.querySelector(".btn__loader");
		expect(loader).to.exist;

		const buttons = el.shadowRoot.querySelectorAll("button[disabled]");
		expect(buttons.length).to.be.greaterThan(0);
	});

	it("closes with close button", async () => {
		const closeHandler = sinon.spy();
		const el = await fixture(html`
      <app-dialog open showClose @close=${closeHandler}>
        Content
      </app-dialog>
    `);

		const closeBtn = el.shadowRoot.querySelector(".dialog__close");
		closeBtn.click();

		expect(closeHandler).to.have.been.calledOnce;
		expect(el.open).to.be.false;
	});

	it("provides public show/hide methods", async () => {
		const el = await fixture(html`<app-dialog>Content</app-dialog>`);

		expect(el.open).to.be.false;

		el.show();
		await el.updateComplete;
		expect(el.open).to.be.true;

		el.hide();
		await el.updateComplete;
		expect(el.open).to.be.false;
	});
});
