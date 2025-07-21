import { fixture as _fixture } from "@open-wc/testing";

export async function fixture(template) {
	if (!document.querySelector("#test-styles")) {
		const style = document.createElement("style");
		style.id = "test-styles";
		style.textContent = `
      ${await fetch("/src/styles/variables.css")
				.then((r) => r.text())
				.catch(() => "")}
      ${await fetch("/src/styles/global.css")
				.then((r) => r.text())
				.catch(() => "")}
    `;
		document.head.appendChild(style);
	}

	return _fixture(template);
}

export * from "@open-wc/testing";
