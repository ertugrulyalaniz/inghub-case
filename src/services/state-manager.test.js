import { expect } from "@open-wc/testing";
import sinon from "sinon";
import { stateManager } from "./state-manager.js";
import { employeeService } from "./employee-service.js";

describe("StateManager", () => {
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.createSandbox();

		localStorage.clear();

		stateManager.state = {
			employees: [],
			filteredEmployees: [],
			selectedEmployee: null,
			viewMode: "table",
			currentPage: 1,
			itemsPerPage: 9,
			searchTerm: "",
			sortBy: "firstName",
			sortOrder: "asc",
			filters: {
				department: null,
				position: null,
			},
			loading: false,
			saving: false,
			error: null,
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe("State Management", () => {
		it("should get current state", () => {
			const state = stateManager.getState();
			expect(state).to.have.property("employees");
			expect(state).to.have.property("viewMode");
			expect(state).to.have.property("currentPage");
		});

		it("should update state and notify subscribers", (done) => {
			const unsubscribe = stateManager.subscribe(({ newState, changes }) => {
				expect(changes).to.have.property("searchTerm", "test");
				expect(newState.searchTerm).to.equal("test");
				unsubscribe();
				done();
			});

			stateManager.setState({ searchTerm: "test" });
		});

		it("should save and load UI preferences", () => {
			stateManager.setState({
				viewMode: "list",
				itemsPerPage: 20,
			});

			const saved = JSON.parse(localStorage.getItem("emp_app_state"));
			expect(saved.viewMode).to.equal("list");
			expect(saved.itemsPerPage).to.equal(20);
		});
	});

	describe("Employee Operations", () => {
		beforeEach(() => {
			sandbox
				.stub(employeeService, "validateEmployee")
				.returns({ isValid: true });
			sandbox.stub(employeeService, "getAllEmployees").returns([]);
		});

		it("should add employee successfully", async () => {
			const employeeData = {
				firstName: "Test",
				lastName: "User",
				email: "test@example.com",
				phone: "+90 555 111 22 33",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Tech",
				position: "Junior",
			};

			sandbox.stub(employeeService, "addEmployee").returns({
				...employeeData,
				id: "test-id-123",
			});

			const result = await stateManager.addEmployee(employeeData);

			expect(result.success).to.be.true;
			expect(result.employee).to.have.property("id");
		});

		it("should handle validation errors when adding employee", async () => {
			const invalidData = {
				firstName: "",
				email: "invalid-email",
			};

			employeeService.validateEmployee.returns({
				isValid: false,
				errors: { firstName: "Required", email: "Invalid format" },
			});

			const result = await stateManager.addEmployee(invalidData);

			expect(result.success).to.be.false;
			expect(result.error).to.exist;
		});

		it("should delete employee", async () => {
			const employee = {
				id: "delete-test-id",
				firstName: "Delete",
				lastName: "Test",
				email: "delete@test.com",
				phone: "+90 555 111 22 33",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Tech",
				position: "Junior",
			};

			stateManager.setState({
				employees: [employee],
				filteredEmployees: [employee],
			});

			sandbox.stub(employeeService, "deleteEmployee").returns(employee);
			employeeService.getAllEmployees.returns([]);

			const result = await stateManager.deleteEmployee(employee.id);

			expect(result.success).to.be.true;
		});
	});

	describe("Pagination", () => {
		beforeEach(() => {
			const employees = Array.from({ length: 25 }, (_, i) => ({
				id: `emp_${i}`,
				firstName: `Employee${i}`,
				lastName: `Test${i}`,
				department: "Tech",
				position: "Junior",
				email: `emp${i}@test.com`,
				phone: "1234567890",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
			}));

			stateManager.state.employees = employees;
			stateManager.state.filteredEmployees = [...employees];
			stateManager.state.itemsPerPage = 10;
		});

		it("should calculate total pages correctly", () => {
			const totalPages = stateManager.getTotalPages();
			expect(totalPages).to.equal(3);
		});

		it("should get paginated employees", () => {
			const page1 = stateManager.getPaginatedEmployees();
			expect(page1).to.have.lengthOf(10);

			stateManager.setPage(3);
			const page3 = stateManager.getPaginatedEmployees();
			expect(page3).to.have.lengthOf(5);
		});

		it("should adjust page when changing items per page", () => {
			stateManager.setPage(2);
			stateManager.setItemsPerPage(20);

			expect(stateManager.state.currentPage).to.equal(1);
		});
	});
});
