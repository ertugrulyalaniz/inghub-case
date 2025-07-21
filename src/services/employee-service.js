import { STORAGE_KEYS, DEPARTMENTS, POSITIONS } from "../config/constants.js";

class EmployeeService {
	constructor() {
		this.employees = [];
		this.loadEmployees();
	}

	loadEmployees() {
		try {
			const stored = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
			if (stored) {
				this.employees = JSON.parse(stored);
			} else {
				this.employees = this.generateDemoData();
				this.saveEmployees();
			}
		} catch (error) {
			console.error("Error loading employees:", error);
			this.employees = [];
		}
	}

	saveEmployees() {
		try {
			localStorage.setItem(
				STORAGE_KEYS.EMPLOYEES,
				JSON.stringify(this.employees),
			);
		} catch (error) {
			console.error("Error saving employees:", error);
		}
	}

	generateDemoData() {
		return [
			{
				id: this.generateId(),
				firstName: "Ahmet",
				lastName: "Sourtimes",
				email: "ahmet@sourtimes.org",
				phone: "+90 532 123 45 67",
				dateOfBirth: "1990-09-23",
				dateOfEmployment: "2022-09-23",
				department: "Analytics",
				position: "Junior",
			},
			{
				id: this.generateId(),
				firstName: "Mehmet",
				lastName: "Yilmaz",
				email: "mehmet@yilmaz.com",
				phone: "+90 555 234 56 78",
				dateOfBirth: "1988-03-12",
				dateOfEmployment: "2021-06-15",
				department: "Tech",
				position: "Senior",
			},
			{
				id: this.generateId(),
				firstName: "Ayse",
				lastName: "Demir",
				email: "ayse@demir.com",
				phone: "+90 544 345 67 89",
				dateOfBirth: "1995-07-08",
				dateOfEmployment: "2023-01-10",
				department: "Analytics",
				position: "Medior",
			},
			{
				id: this.generateId(),
				firstName: "Fatma",
				lastName: "Kaya",
				email: "fatma@kaya.com",
				phone: "+90 533 456 78 90",
				dateOfBirth: "1992-11-20",
				dateOfEmployment: "2022-03-01",
				department: "Tech",
				position: "Medior",
			},
			{
				id: this.generateId(),
				firstName: "Ali",
				lastName: "Ozturk",
				email: "ali@ozturk.com",
				phone: "+90 542 567 89 01",
				dateOfBirth: "1985-05-15",
				dateOfEmployment: "2020-01-15",
				department: "Analytics",
				position: "Senior",
			},
			{
				id: this.generateId(),
				firstName: "Ahmet",
				lastName: "Sourtimes",
				email: "ahmet@sourtimes.org",
				phone: "+90 532 123 45 67",
				dateOfBirth: "1990-09-23",
				dateOfEmployment: "2022-09-23",
				department: "Analytics",
				position: "Junior",
			},
			{
				id: this.generateId(),
				firstName: "Mehmet",
				lastName: "Yilmaz",
				email: "mehmet@yilmaz.com",
				phone: "+90 555 234 56 78",
				dateOfBirth: "1988-03-12",
				dateOfEmployment: "2021-06-15",
				department: "Tech",
				position: "Senior",
			},
			{
				id: this.generateId(),
				firstName: "Ayse",
				lastName: "Demir",
				email: "ayse@demir.com",
				phone: "+90 544 345 67 89",
				dateOfBirth: "1995-07-08",
				dateOfEmployment: "2023-01-10",
				department: "Analytics",
				position: "Medior",
			},
			{
				id: this.generateId(),
				firstName: "Fatma",
				lastName: "Kaya",
				email: "fatma@kaya.com",
				phone: "+90 533 456 78 90",
				dateOfBirth: "1992-11-20",
				dateOfEmployment: "2022-03-01",
				department: "Tech",
				position: "Medior",
			},
			{
				id: this.generateId(),
				firstName: "Ali",
				lastName: "Ozturk",
				email: "ali@ozturk.com",
				phone: "+90 542 567 89 01",
				dateOfBirth: "1985-05-15",
				dateOfEmployment: "2020-01-15",
				department: "Analytics",
				position: "Senior",
			},
			{
				id: this.generateId(),
				firstName: "Ahmet",
				lastName: "Sourtimes",
				email: "ahmet@sourtimes.org",
				phone: "+90 532 123 45 67",
				dateOfBirth: "1990-09-23",
				dateOfEmployment: "2022-09-23",
				department: "Analytics",
				position: "Junior",
			},
			{
				id: this.generateId(),
				firstName: "Mehmet",
				lastName: "Yilmaz",
				email: "mehmet@yilmaz.com",
				phone: "+90 555 234 56 78",
				dateOfBirth: "1988-03-12",
				dateOfEmployment: "2021-06-15",
				department: "Tech",
				position: "Senior",
			},
			{
				id: this.generateId(),
				firstName: "Ayse",
				lastName: "Demir",
				email: "ayse@demir.com",
				phone: "+90 544 345 67 89",
				dateOfBirth: "1995-07-08",
				dateOfEmployment: "2023-01-10",
				department: "Analytics",
				position: "Medior",
			},
			{
				id: this.generateId(),
				firstName: "Fatma",
				lastName: "Kaya",
				email: "fatma@kaya.com",
				phone: "+90 533 456 78 90",
				dateOfBirth: "1992-11-20",
				dateOfEmployment: "2022-03-01",
				department: "Tech",
				position: "Medior",
			},
			{
				id: this.generateId(),
				firstName: "Ali",
				lastName: "Ozturk",
				email: "ali@ozturk.com",
				phone: "+90 542 567 89 01",
				dateOfBirth: "1985-05-15",
				dateOfEmployment: "2020-01-15",
				department: "Analytics",
				position: "Senior",
			},
		];
	}

	generateId() {
		return `emp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	getAllEmployees() {
		return [...this.employees];
	}

	getEmployeeById(id) {
		return this.employees.find((emp) => emp.id === id);
	}

	addEmployee(employeeData) {
		const newEmployee = {
			...employeeData,
			id: this.generateId(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		this.employees.push(newEmployee);
		this.saveEmployees();

		return newEmployee;
	}

	updateEmployee(id, updates) {
		const index = this.employees.findIndex((emp) => emp.id === id);

		if (index === -1) {
			throw new Error("Employee not found");
		}

		this.employees[index] = {
			...this.employees[index],
			...updates,
			updatedAt: new Date().toISOString(),
		};

		this.saveEmployees();

		return this.employees[index];
	}

	deleteEmployee(id) {
		const index = this.employees.findIndex((emp) => emp.id === id);

		if (index === -1) {
			throw new Error("Employee not found");
		}

		const deleted = this.employees.splice(index, 1)[0];
		this.saveEmployees();

		return deleted;
	}

	validateEmployee(employeeData, isUpdate = false) {
		const errors = {};

		const requiredFields = [
			"firstName",
			"lastName",
			"email",
			"phone",
			"dateOfBirth",
			"dateOfEmployment",
			"department",
			"position",
		];

		requiredFields.forEach((field) => {
			if (
				!employeeData[field] ||
				(typeof employeeData[field] === "string" &&
					employeeData[field].trim() === "")
			) {
				errors[field] = "This field is required";
			}
		});

		if (employeeData.email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(employeeData.email)) {
				errors.email = "Invalid email format";
			}

			const duplicate = this.employees.find(
				(emp) =>
					emp.email === employeeData.email &&
					(!isUpdate || emp.id !== employeeData.id),
			);

			if (duplicate) {
				errors.email = "An employee with this email already exists";
			}
		}

		if (employeeData.phone) {
			const phoneRegex = /^\+?[\d\s()-]+$/;
			if (!phoneRegex.test(employeeData.phone)) {
				errors.phone = "Invalid phone number format";
			}
		}

		if (employeeData.department) {
			const validDepartments = Object.values(DEPARTMENTS);
			if (!validDepartments.includes(employeeData.department)) {
				errors.department = `Department must be one of: ${validDepartments.join(", ")}`;
			}
		}

		if (employeeData.position) {
			const validPositions = Object.values(POSITIONS);
			if (!validPositions.includes(employeeData.position)) {
				errors.position = `Position must be one of: ${validPositions.join(", ")}`;
			}
		}

		if (employeeData.dateOfBirth) {
			const birthDate = new Date(employeeData.dateOfBirth);

			if (isNaN(birthDate.getTime())) {
				errors.dateOfBirth = "Invalid date format";
			} else {
				const today = new Date();

				if (birthDate > today) {
					errors.dateOfBirth = "Birth date cannot be in the future";
				}

				const age = (today - birthDate) / (365.25 * 24 * 60 * 60 * 1000);
				if (age < 18) {
					errors.dateOfBirth = "Employee must be at least 18 years old";
				}
			}
		}

		if (employeeData.dateOfEmployment) {
			const employmentDate = new Date(employeeData.dateOfEmployment);

			if (isNaN(employmentDate.getTime())) {
				errors.dateOfEmployment = "Invalid date format";
			} else if (employeeData.dateOfBirth) {
				const birthDate = new Date(employeeData.dateOfBirth);

				if (!isNaN(birthDate.getTime()) && employmentDate < birthDate) {
					errors.dateOfEmployment =
						"Employment date cannot be before birth date";
				}
			}
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	}

	getStatistics() {
		const stats = {
			total: this.employees.length,
			byDepartment: {},
			byPosition: {},
			averageAge: 0,
		};

		this.employees.forEach((emp) => {
			stats.byDepartment[emp.department] =
				(stats.byDepartment[emp.department] || 0) + 1;
			stats.byPosition[emp.position] =
				(stats.byPosition[emp.position] || 0) + 1;
		});

		if (this.employees.length > 0) {
			const totalAge = this.employees.reduce((sum, emp) => {
				const age =
					(new Date() - new Date(emp.dateOfBirth)) /
					(365.25 * 24 * 60 * 60 * 1000);
				return sum + age;
			}, 0);

			stats.averageAge = Math.round(totalAge / this.employees.length);
		}

		return stats;
	}

	clearAllData() {
		this.employees = [];
		this.saveEmployees();
	}

	exportData() {
		return {
			employees: this.employees,
			exportedAt: new Date().toISOString(),
			version: "1.0",
		};
	}

	importData(data) {
		if (!data.employees || !Array.isArray(data.employees)) {
			throw new Error("Invalid import data format");
		}

		this.employees = data.employees;
		this.saveEmployees();

		return this.employees.length;
	}
}

export const employeeService = new EmployeeService();
