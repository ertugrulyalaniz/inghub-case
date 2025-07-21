import { Router } from "@vaadin/router";
import { ROUTES, ROUTE_NAMES } from "@config/routes.js";

let router;

export function initRouter(outlet) {
	router = new Router(outlet);

	const routes = [
		{
			path: ROUTES.HOME,
			redirect: ROUTES.EMPLOYEES,
		},
		{
			path: ROUTES.EMPLOYEES,
			name: ROUTE_NAMES.EMPLOYEES,
			component: "employee-list-page",
			action: async () => {
				await import("./pages/employee-list-page.js");
			},
		},
		{
			path: ROUTES.EMPLOYEE_ADD,
			name: ROUTE_NAMES.EMPLOYEE_ADD,
			component: "employee-add-page",
			action: async () => {
				await import("./pages/employee-add-page.js");
			},
		},
		{
			path: ROUTES.EMPLOYEE_EDIT,
			name: ROUTE_NAMES.EMPLOYEE_EDIT,
			component: "employee-edit-page",
			action: async (context, commands) => {
				await import("./pages/employee-edit-page.js");

				const component = document.createElement("employee-edit-page");
				component.employeeId = context.params.id;
				return component;
			},
		},
		{
			path: "(.*)",
			name: ROUTE_NAMES.NOT_FOUND,
			component: "not-found-page",
			action: async () => {
				await import("./pages/not-found-page.js");
			},
		},
	];

	router.setRoutes(routes);

	return router;
}

export function navigateTo(path) {
	if (router) {
		Router.go(path);
	}
}

export function getCurrentLocation() {
	if (router) {
		return router.location;
	}
	return null;
}

export function addNavigationListener(callback) {
	window.addEventListener("vaadin-router-location-changed", callback);

	return () => {
		window.removeEventListener("vaadin-router-location-changed", callback);
	};
}
