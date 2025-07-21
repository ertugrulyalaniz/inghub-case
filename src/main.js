import "./app.js";

document.addEventListener("DOMContentLoaded", () => {
	const app = document.createElement("employee-app");
	document.body.appendChild(app);

	const savedLang = localStorage.getItem("emp_language") || "en";
	document.documentElement.lang = savedLang;
});
