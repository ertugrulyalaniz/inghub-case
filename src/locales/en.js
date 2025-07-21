export default {
	app: {
		title: "Employee Management",
	},

	nav: {
		home: "Home",
		employees: "Employees",
		addEmployee: "Add Employee",
		language: "Language",
		toggleMenu: "Toggle menu",
		userMenu: "User menu",
		statistics: "Statistics",
	},

	common: {
		save: "Save",
		cancel: "Cancel",
		edit: "Edit",
		delete: "Delete",
		actions: "Actions",
		loading: "Loading...",
		noData: "No data available",
		confirm: "Confirm",
		close: "Close",
		view: "View",
		add: "Add",
		update: "Update",
		ok: "OK",
		selectOption: "Please Select",
		backToList: "Back to List",
	},

	employee: {
		firstName: "First Name",
		lastName: "Last Name",
		email: "Email",
		phone: "Phone",
		dateOfBirth: "Date of Birth",
		dateOfEmployment: "Date of Employment",
		department: "Department",
		position: "Position",
		employeeList: "Employee List",
		addEmployee: "Add Employee",
		editEmployee: "Edit Employee",
		editingEmployee: "You are editing",
		employeeDetails: "Employee Details",
		totalEmployees: "Total Employees",
	},

	departments: {
		analytics: "Analytics",
		tech: "Tech",
	},

	positions: {
		junior: "Junior",
		medior: "Medior",
		senior: "Senior",
	},

	viewModes: {
		table: "Table View",
		list: "List View",
	},

	pagination: {
		page: "Page",
		of: "of",
		items: "items",
		itemsPerPage: "Items per page",
		showing: "Showing",
		to: "to",
		previous: "Previous",
		next: "Next",
		first: "First",
		last: "Last",
		noItems: "No items found",
	},

	validation: {
		required: "This field is required",
		invalidEmail: "Please enter a valid email address",
		invalidPhone: "Please enter a valid phone number",
		invalidDate: "Please enter a valid date",
		minLength: "Minimum length is {min} characters",
		maxLength: "Maximum length is {max} characters",
		emailExists: "An employee with this email already exists",
		futureDate: "Date cannot be in the future",
		employmentBeforeBirth: "Employment date cannot be before birth date",
	},

	confirmations: {
		deleteEmployee: {
			title: "Delete Employee",
			message:
				"Are you sure you want to delete {name}? This action cannot be undone.",
			confirm: "Delete",
			cancel: "Cancel",
		},
		updateEmployee: {
			title: "Update Employee",
			message: "Are you sure you want to update this employee information?",
			confirm: "Update",
			cancel: "Cancel",
		},
		unsavedChanges: {
			title: "Unsaved Changes",
			message: "You have unsaved changes. Are you sure you want to leave?",
			confirm: "Leave",
			cancel: "Stay",
		},
	},

	success: {
		employeeAdded: "Employee added successfully",
		employeeAddedMessage: "The new employee has been added to the system.",
		employeeUpdated: "Employee updated successfully",
		employeeDeleted: "Employee deleted successfully",
	},

	errors: {
		loadingEmployees: "Error loading employees",
		savingEmployee: "Error saving employee",
		deletingEmployee: "Error deleting employee",
		employeeNotFound: "Employee not found",
		employeeNotFoundMessage:
			"The employee you are looking for does not exist or has been removed.",
		genericError: "An error occurred. Please try again.",
	},

	emptyStates: {
		noEmployees: "No employees found",
		addFirstEmployee: "Get started by adding your first employee",
	},

	tooltips: {
		editEmployee: "Edit employee",
		deleteEmployee: "Delete employee",
		viewDetails: "View employee details",
		switchToTable: "Switch to table view",
		switchToList: "Switch to list view",
	},

	stats: {
		totalEmployees: "Total Employees",
		departments: "Departments",
		averageAge: "Average Age",
	},
};
