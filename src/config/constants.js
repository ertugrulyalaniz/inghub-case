export const DEPARTMENTS = {
	ANALYTICS: "Analytics",
	TECH: "Tech",
};

export const POSITIONS = {
	JUNIOR: "Junior",
	MEDIOR: "Medior",
	SENIOR: "Senior",
};

export const VIEW_MODES = {
	TABLE: "table",
	LIST: "list",
};

export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_PAGE_SIZE: 9,
	PAGE_SIZE_OPTIONS: [9, 18, 36, 72],
};

export const STORAGE_KEYS = {
	EMPLOYEES: "emp_data",
	APP_STATE: "emp_app_state",
	LANGUAGE: "emp_language",
	VIEW_MODE: "emp_view_mode",
};

export const LANGUAGES = {
	EN: "en",
	TR: "tr",
};

export const DATE_FORMATS = {
	DISPLAY: "DD/MM/YYYY",
	INPUT: "YYYY-MM-DD",
};

export const VALIDATION = {
	EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	PHONE: /^\+?[\d\s()-]+$/,
	NAME: /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s'-]+$/,
};

export const API_ENDPOINTS = {
	EMPLOYEES: "/api/employees",
};

export const EVENTS = {
	EMPLOYEE_ADDED: "employee-added",
	EMPLOYEE_UPDATED: "employee-updated",
	EMPLOYEE_DELETED: "employee-deleted",
	VIEW_MODE_CHANGED: "view-mode-changed",
	LANGUAGE_CHANGED: "language-changed",
};
