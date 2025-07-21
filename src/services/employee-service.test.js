import { expect } from "@open-wc/testing";
import { employeeService } from "./employee-service.js";

describe("EmployeeService", () => {
	beforeEach(() => {
		localStorage.clear();
		employeeService.employees = [];
		employeeService.loadEmployees();
	});

	describe("CRUD Operations", () => {
		it("should add employee", () => {
			const employeeData = {
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				phone: "+90 555 123 45 67",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Tech",
				position: "Senior",
			};

			const employee = employeeService.addEmployee(employeeData);

			expect(employee).to.have.property("id");
			expect(employee.firstName).to.equal("John");
			expect(employeeService.employees).to.have.lengthOf.above(0);
		});

		it("should update employee", () => {
			const employee = employeeService.addEmployee({
				firstName: "Jane",
				lastName: "Doe",
				email: "jane@example.com",
				phone: "+90 555 123 45 67",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Analytics",
				position: "Junior",
			});

			const updated = employeeService.updateEmployee(employee.id, {
				position: "Medior",
			});

			expect(updated.position).to.equal("Medior");
			expect(updated.id).to.equal(employee.id);
		});

		it("should delete employee", () => {
			const employee = employeeService.addEmployee({
				firstName: "Delete",
				lastName: "Me",
				email: "delete@example.com",
				phone: "+90 555 123 45 67",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Tech",
				position: "Junior",
			});

			const initialCount = employeeService.employees.length;
			employeeService.deleteEmployee(employee.id);

			expect(employeeService.employees.length).to.equal(initialCount - 1);
			const found = employeeService.getEmployeeById(employee.id);
			expect(found).to.be.undefined;
		});

		it("should get employee by ID", () => {
			const employee = employeeService.addEmployee({
				firstName: "Find",
				lastName: "Me",
				email: "find@example.com",
				phone: "+90 555 123 45 67",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Tech",
				position: "Junior",
			});

			const found = employeeService.getEmployeeById(employee.id);
			expect(found).to.exist;
			expect(found.id).to.equal(employee.id);
		});

		it("should throw error when updating non-existent employee", () => {
			expect(() => {
				employeeService.updateEmployee("non-existent-id", {
					firstName: "Test",
				});
			}).to.throw("Employee not found");
		});

		it("should throw error when deleting non-existent employee", () => {
			expect(() => {
				employeeService.deleteEmployee("non-existent-id");
			}).to.throw("Employee not found");
		});
	});

	describe("Validation", () => {
		it("should validate required fields", () => {
			const result = employeeService.validateEmployee({
				firstName: "",
				email: "test@example.com",
			});

			expect(result.isValid).to.be.false;
			expect(result.errors).to.have.property("firstName");
			expect(result.errors).to.have.property("lastName");
		});

		it("should validate email format", () => {
			const result = employeeService.validateEmployee({
				firstName: "Test",
				lastName: "User",
				email: "invalid-email",
				phone: "+90 555 123 45 67",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Tech",
				position: "Junior",
			});

			expect(result.isValid).to.be.false;
			expect(result.errors).to.have.property("email");
		});

		it("should validate phone format", () => {
			const result = employeeService.validateEmployee({
				firstName: "Test",
				lastName: "User",
				email: "test@example.com",
				phone: "invalid phone",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Tech",
				position: "Junior",
			});

			expect(result.isValid).to.be.false;
			expect(result.errors).to.have.property("phone");
		});

		it("should validate dates", () => {
			const result = employeeService.validateEmployee({
				firstName: "Test",
				lastName: "User",
				email: "test@example.com",
				phone: "+90 555 123 45 67",
				dateOfBirth: "invalid-date",
				dateOfEmployment: "invalid-date",
				department: "Tech",
				position: "Junior",
			});

			expect(result.isValid).to.be.false;
			expect(result.errors).to.have.property("dateOfBirth");
			expect(result.errors).to.have.property("dateOfEmployment");
		});

		it("should validate department and position", () => {
			const result = employeeService.validateEmployee({
				firstName: "Test",
				lastName: "User",
				email: "test@example.com",
				phone: "+90 555 123 45 67",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "InvalidDept",
				position: "InvalidPos",
			});

			expect(result.isValid).to.be.false;
			expect(result.errors).to.have.property("department");
			expect(result.errors).to.have.property("position");
		});

		it("should pass validation for valid employee", () => {
			const result = employeeService.validateEmployee({
				firstName: "Test",
				lastName: "User",
				email: "test@example.com",
				phone: "+90 555 123 45 67",
				dateOfBirth: "1990-01-01",
				dateOfEmployment: "2023-01-01",
				department: "Tech",
				position: "Junior",
			});

			expect(result.isValid).to.be.true;
			expect(result.errors).to.be.empty;
		});
	});

	describe("Statistics", () => {
		beforeEach(() => {
			employeeService.employees = [
				{
					id: "1",
					firstName: "Test1",
					lastName: "User1",
					dateOfBirth: "1990-01-01",
					department: "Tech",
					position: "Senior",
				},
				{
					id: "2",
					firstName: "Test2",
					lastName: "User2",
					dateOfBirth: "1995-01-01",
					department: "Tech",
					position: "Junior",
				},
				{
					id: "3",
					firstName: "Test3",
					lastName: "User3",
					dateOfBirth: "1985-01-01",
					department: "Analytics",
					position: "Senior",
				},
			];
		});

		it("should calculate statistics correctly", () => {
			const stats = employeeService.getStatistics();

			expect(stats.total).to.equal(3);
			expect(stats.byDepartment.Tech).to.equal(2);
			expect(stats.byDepartment.Analytics).to.equal(1);
			expect(stats.byPosition.Senior).to.equal(2);
			expect(stats.byPosition.Junior).to.equal(1);
			expect(stats.averageAge).to.be.above(25);
		});
	});

	describe("Data Import/Export", () => {
		it("should export data", () => {
			employeeService.employees = [
				{ id: "1", firstName: "Test", lastName: "User" },
			];

			const exported = employeeService.exportData();

			expect(exported).to.have.property("employees");
			expect(exported).to.have.property("exportedAt");
			expect(exported).to.have.property("version");
			expect(exported.employees).to.have.lengthOf(1);
		});

		it("should import valid data", () => {
			const importData = {
				employees: [
					{ id: "1", firstName: "Imported", lastName: "User" },
					{ id: "2", firstName: "Another", lastName: "Import" },
				],
				exportedAt: new Date().toISOString(),
				version: "1.0",
			};

			const count = employeeService.importData(importData);

			expect(count).to.equal(2);
			expect(employeeService.employees).to.have.lengthOf(2);
			expect(employeeService.employees[0].firstName).to.equal("Imported");
		});

		it("should throw error for invalid import data", () => {
			expect(() => {
				employeeService.importData({ invalid: "data" });
			}).to.throw("Invalid import data format");
		});
	});

	describe("Local Storage", () => {
		it("should save to localStorage", () => {
			employeeService.employees = [
				{ id: "1", firstName: "Storage", lastName: "Test" },
			];

			employeeService.saveEmployees();

			const stored = localStorage.getItem("emp_data");
			expect(stored).to.exist;

			const parsed = JSON.parse(stored);
			expect(parsed).to.have.lengthOf(1);
			expect(parsed[0].firstName).to.equal("Storage");
		});

		it("should load from localStorage", () => {
			const testData = [{ id: "1", firstName: "Loaded", lastName: "Data" }];

			localStorage.setItem("emp_data", JSON.stringify(testData));

			employeeService.employees = [];
			employeeService.loadEmployees();

			expect(employeeService.employees).to.have.lengthOf(1);
			expect(employeeService.employees[0].firstName).to.equal("Loaded");
		});
	});
});
