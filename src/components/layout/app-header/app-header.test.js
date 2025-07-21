import { html, fixture, expect } from "@open-wc/testing";
import sinon from "sinon";
import "./app-header.js";

describe("AppHeader", () => {
	it("renders header elements", async () => {
		const el = await fixture(html`<app-header></app-header>`);

		await el.updateComplete;

		const header = el.shadowRoot.querySelector(".header");
		expect(header).to.exist;

		const logo = el.shadowRoot.querySelector(".header__logo");
		expect(logo).to.exist;

		const languageToggle = el.shadowRoot.querySelector(
			".header__language-toggle",
		);
		expect(languageToggle).to.exist;
	});

	it("shows language menu on click", async () => {
		const el = await fixture(html`<app-header></app-header>`);

		await el.updateComplete;

		const languageToggle = el.shadowRoot.querySelector(
			".header__language-toggle",
		);
		languageToggle.click();

		await el.updateComplete;

		const languageMenu = el.shadowRoot.querySelector(".header__language-menu");
		expect(languageMenu).to.exist;
	});

	it("changes language on selection", async () => {
		const el = await fixture(html`<app-header></app-header>`);

		await el.updateComplete;

		const languageToggle = el.shadowRoot.querySelector(
			".header__language-toggle",
		);
		languageToggle.click();
		await el.updateComplete;

		const turkishOption = el.shadowRoot.querySelectorAll(
			".header__language-option",
		)[1];
		expect(turkishOption).to.exist;
		turkishOption.click();

		await el.updateComplete;

		const languageMenu = el.shadowRoot.querySelector(".header__language-menu");
		expect(languageMenu).to.not.exist;
	});
});
