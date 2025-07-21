export const ROUTES = {
	HOME: "/",
	EMPLOYEES: "/employees",
	EMPLOYEE_ADD: "/employees/add",
	EMPLOYEE_EDIT: "/employees/edit/:id",
	NOT_FOUND: "/404",
};

export const ROUTE_NAMES = {
	HOME: "home",
	EMPLOYEES: "employees",
	EMPLOYEE_ADD: "employee-add",
	EMPLOYEE_EDIT: "employee-edit",
	NOT_FOUND: "not-found",
};

export const getEditRoute = (id) => `/employees/edit/${id}`;

export const navigateToEmployee = (id) => {
	import("../router.js").then(({ navigateTo }) => {
		navigateTo(getEditRoute(id));
	});
};

export const getRouteTitle = (routeName, lang = "en") => {
	const titles = {
		en: {
			[ROUTE_NAMES.HOME]: "Home",
			[ROUTE_NAMES.EMPLOYEES]: "Employees",
			[ROUTE_NAMES.EMPLOYEE_ADD]: "Add Employee",
			[ROUTE_NAMES.EMPLOYEE_EDIT]: "Edit Employee",
			[ROUTE_NAMES.NOT_FOUND]: "Page Not Found",
		},
		tr: {
			[ROUTE_NAMES.HOME]: "Ana Sayfa",
			[ROUTE_NAMES.EMPLOYEES]: "Çalışanlar",
			[ROUTE_NAMES.EMPLOYEE_ADD]: "Çalışan Ekle",
			[ROUTE_NAMES.EMPLOYEE_EDIT]: "Çalışan Düzenle",
			[ROUTE_NAMES.NOT_FOUND]: "Sayfa Bulunamadı",
		},
	};

	return titles[lang]?.[routeName] || titles.en[routeName];
};

export const routeConfig = [
	{
		path: ROUTES.HOME,
		redirect: ROUTES.EMPLOYEES,
	},
	{
		path: ROUTES.EMPLOYEES,
		name: ROUTE_NAMES.EMPLOYEES,
		component: "employee-list-page",
		action: async () => {
			await import("@pages/employee-list-page.js");
		},
	},
	{
		path: ROUTES.EMPLOYEE_ADD,
		name: ROUTE_NAMES.EMPLOYEE_ADD,
		component: "employee-add-page",
		action: async () => {
			await import("@pages/employee-add-page.js");
		},
	},
	{
		path: ROUTES.EMPLOYEE_EDIT,
		name: ROUTE_NAMES.EMPLOYEE_EDIT,
		component: "employee-edit-page",
		action: async () => {
			await import("@pages/employee-edit-page.js");
		},
	},
	{
		path: "(.*)",
		name: ROUTE_NAMES.NOT_FOUND,
		component: "not-found-page",
		action: async () => {
			await import("@pages/not-found-page.js");
		},
	},
];
