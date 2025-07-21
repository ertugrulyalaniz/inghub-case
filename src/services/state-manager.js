import { employeeService } from "./employee-service.js";
import {
	STORAGE_KEYS,
	VIEW_MODES,
	PAGINATION,
	EVENTS,
} from "@config/constants.js";

class StateManager extends EventTarget {
	constructor() {
		super();

		this.state = {
			employees: [],
			selectedEmployee: null,

			viewMode: VIEW_MODES.TABLE,
			currentPage: PAGINATION.DEFAULT_PAGE,
			itemsPerPage: PAGINATION.DEFAULT_PAGE_SIZE,
			sortBy: "firstName",
			sortOrder: "asc",

			loading: false,
			saving: false,

			error: null,
		};

		this.loadState();
		this.initializeData();
	}

	loadState() {
		try {
			const savedState = localStorage.getItem(STORAGE_KEYS.APP_STATE);
			if (savedState) {
				const parsed = JSON.parse(savedState);

				this.state.viewMode = parsed.viewMode || this.state.viewMode;
				this.state.itemsPerPage =
					parsed.itemsPerPage || this.state.itemsPerPage;
				this.state.sortBy = parsed.sortBy || this.state.sortBy;
				this.state.sortOrder = parsed.sortOrder || this.state.sortOrder;
			}
		} catch (error) {
			console.error("Error loading state:", error);
		}
	}

	saveState() {
		try {
			const stateToSave = {
				viewMode: this.state.viewMode,
				itemsPerPage: this.state.itemsPerPage,
				sortBy: this.state.sortBy,
				sortOrder: this.state.sortOrder,
			};
			localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(stateToSave));
		} catch (error) {
			console.error("Error saving state:", error);
		}
	}

	async initializeData() {
		this.setState({ loading: true });

		try {
			const employees = employeeService.getAllEmployees();
			this.setState({
				employees,
				loading: false,
			});
			this.applySort();
		} catch (error) {
			this.setState({
				error: error.message,
				loading: false,
			});
		}
	}

	getState() {
		return { ...this.state };
	}

	setState(updates) {
		const oldState = { ...this.state };
		this.state = { ...this.state, ...updates };

		if (
			updates.viewMode ||
			updates.itemsPerPage ||
			updates.sortBy ||
			updates.sortOrder
		) {
			this.saveState();
		}

		this.dispatchEvent(
			new CustomEvent("state-changed", {
				detail: {
					newState: this.state,
					oldState,
					changes: updates,
				},
			}),
		);
	}

	subscribe(callback) {
		const handler = (event) => callback(event.detail);
		this.addEventListener("state-changed", handler);

		return () => this.removeEventListener("state-changed", handler);
	}

	applySort() {
		let sorted = [...this.state.employees];

		sorted.sort((a, b) => {
			const aVal = a[this.state.sortBy];
			const bVal = b[this.state.sortBy];

			if (aVal < bVal) return this.state.sortOrder === "asc" ? -1 : 1;
			if (aVal > bVal) return this.state.sortOrder === "asc" ? 1 : -1;
			return 0;
		});

		this.setState({ filteredEmployees: sorted });
	}

	getPaginatedEmployees() {
		const start = (this.state.currentPage - 1) * this.state.itemsPerPage;
		const end = start + this.state.itemsPerPage;

		return this.state.filteredEmployees.slice(start, end);
	}

	getTotalPages() {
		return Math.ceil(
			this.state.filteredEmployees.length / this.state.itemsPerPage,
		);
	}

	setSort(sortBy) {
		const sortOrder =
			this.state.sortBy === sortBy && this.state.sortOrder === "asc"
				? "desc"
				: "asc";

		this.setState({ sortBy, sortOrder });
		this.applySort();
	}

	setPage(page) {
		const totalPages = this.getTotalPages();
		if (page >= 1 && page <= totalPages) {
			this.setState({ currentPage: page });
		}
	}

	setItemsPerPage(itemsPerPage) {
		const currentFirstItem =
			(this.state.currentPage - 1) * this.state.itemsPerPage;
		const newPage = Math.floor(currentFirstItem / itemsPerPage) + 1;

		this.setState({
			itemsPerPage,
			currentPage: newPage,
		});
	}

	setViewMode(viewMode) {
		this.setState({ viewMode });

		window.dispatchEvent(
			new CustomEvent(EVENTS.VIEW_MODE_CHANGED, {
				detail: { viewMode },
			}),
		);
	}

	async addEmployee(employeeData) {
		this.setState({ saving: true, error: null });

		try {
			const validation = employeeService.validateEmployee(employeeData);
			if (!validation.isValid) {
				this.setState({ saving: false });
				return {
					success: false,
					error: "Validation failed",
					errors: validation.errors,
				};
			}

			const newEmployee = employeeService.addEmployee(employeeData);

			const employees = employeeService.getAllEmployees();
			this.setState({
				employees,
				saving: false,
			});
			this.applySort();

			window.dispatchEvent(
				new CustomEvent(EVENTS.EMPLOYEE_ADDED, {
					detail: { employee: newEmployee },
				}),
			);

			return { success: true, employee: newEmployee };
		} catch (error) {
			this.setState({
				error: error.message,
				saving: false,
			});
			return { success: false, error: error.message };
		}
	}

	async updateEmployee(id, updates) {
		this.setState({ saving: true, error: null });

		try {
			const existing = employeeService.getEmployeeById(id);
			if (!existing) {
				throw new Error("Employee not found");
			}

			const validation = employeeService.validateEmployee(
				{ ...existing, ...updates },
				true,
			);
			if (!validation.isValid) {
				throw new Error("Validation failed");
			}

			const updated = employeeService.updateEmployee(id, updates);

			const employees = employeeService.getAllEmployees();
			this.setState({
				employees,
				saving: false,
			});
			this.applySort();

			window.dispatchEvent(
				new CustomEvent(EVENTS.EMPLOYEE_UPDATED, {
					detail: { employee: updated },
				}),
			);

			return { success: true, employee: updated };
		} catch (error) {
			this.setState({
				error: error.message,
				saving: false,
			});
			return { success: false, error: error.message };
		}
	}

	async deleteEmployee(id) {
		this.setState({ saving: true, error: null });

		try {
			const deleted = employeeService.deleteEmployee(id);

			const employees = employeeService.getAllEmployees();
			this.setState({
				employees,
				saving: false,
			});
			this.applySort();

			const totalPages = this.getTotalPages();
			if (this.state.currentPage > totalPages && totalPages > 0) {
				this.setPage(totalPages);
			}

			window.dispatchEvent(
				new CustomEvent(EVENTS.EMPLOYEE_DELETED, {
					detail: { employee: deleted },
				}),
			);

			return { success: true };
		} catch (error) {
			this.setState({
				error: error.message,
				saving: false,
			});
			return { success: false, error: error.message };
		}
	}

	selectEmployee(employee) {
		this.setState({ selectedEmployee: employee });
	}

	getStatistics() {
		return employeeService.getStatistics();
	}
}

export const stateManager = new StateManager();
