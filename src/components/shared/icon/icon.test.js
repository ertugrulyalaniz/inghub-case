import { html, fixture, expect } from "@open-wc/testing";
import "./icon.js";

describe("AppIcon", () => {
	it("renders with default properties", async () => {
		const el = await fixture(html`<app-icon name="user"></app-icon>`);

		expect(el).to.exist;
		const svg = el.shadowRoot.querySelector("svg");
		expect(svg).to.exist;
		expect(svg.getAttribute("width")).to.equal("20");
		expect(svg.getAttribute("stroke")).to.equal("currentColor");
	});

	it("renders different sizes", async () => {
		const small = await fixture(
			html`<app-icon name="user" size="small"></app-icon>`,
		);
		const large = await fixture(
			html`<app-icon name="user" size="large"></app-icon>`,
		);
		const custom = await fixture(
			html`<app-icon name="user" size="32"></app-icon>`,
		);

		expect(
			small.shadowRoot.querySelector("svg").getAttribute("width"),
		).to.equal("16");
		expect(
			large.shadowRoot.querySelector("svg").getAttribute("width"),
		).to.equal("24");
		expect(
			custom.shadowRoot.querySelector("svg").getAttribute("width"),
		).to.equal("32");
	});

	it("applies custom color", async () => {
		const el = await fixture(html`
      <app-icon name="user" color="#ff6200"></app-icon>
    `);

		const svg = el.shadowRoot.querySelector("svg");
		expect(svg.getAttribute("stroke")).to.equal("#ff6200");
	});

	it("applies custom stroke width", async () => {
		const el = await fixture(html`
      <app-icon name="user" strokeWidth="3"></app-icon>
    `);

		const svg = el.shadowRoot.querySelector("svg");
		expect(svg.getAttribute("stroke-width")).to.equal("3");
	});

	it("renders empty for unknown icon", async () => {
		const el = await fixture(html`<app-icon name="unknown"></app-icon>`);

		const svg = el.shadowRoot.querySelector("svg");
		expect(svg).to.not.exist;
	});

	it("has aria-hidden for accessibility", async () => {
		const el = await fixture(html`<app-icon name="user"></app-icon>`);

		const svg = el.shadowRoot.querySelector("svg");
		expect(svg.getAttribute("aria-hidden")).to.equal("true");
	});

	it("renders all icon variants", async () => {
		const icons = [
			"menu",
			"close",
			"edit",
			"delete",
			"save",
			"user",
			"users",
			"mail",
			"phone",
			"calendar",
			"search",
			"filter",
			"settings",
			"grid",
			"list",
		];

		for (const icon of icons) {
			const el = await fixture(html`<app-icon name=${icon}></app-icon>`);
			const svg = el.shadowRoot.querySelector("svg");
			expect(svg).to.exist;
		}
	});
});
