const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'qlqjsdmfEhqkRnj?0801@',
	database: 'employee_db',
});

db.connect((err) => {
	if (err) throw err;
	console.log('connected as id ' + db.threadId);
	promptUser();
});

const promptUser = () => {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'choices',
				message: 'What would you like to do?',
				loop: false,
				choices: [
					'View all departments',
					'View all roles',
					'View all employees',
					'Add department',
					'Add role',
					'Add employee',
					'Update employee role',
					'Update employee manager',
					'View employees by department',
					'Delete department',
					'Delete role',
					'Delete employee',
					'Quit',
				],
			},
		])
		.then((answers) => {
			const { choices } = answers;

			if (choices === 'View all departments') {
				showDepartments();
			}

			if (choices === 'View all roles') {
				showRoles();
			}

			if (choices === 'View all employees') {
				showEmployees();
			}

			if (choices === 'Add department') {
				addDepartment();
			}

			if (choices === 'Add role') {
				addRole();
			}

			if (choices === 'Add employee') {
				addEmployee();
			}

			if (choices === 'Update employee role') {
				updateEmployee();
			}

			if (choices === 'Update employee manager') {
				updateManager();
			}

			if (choices === 'View employees by department') {
				employeeDepartment();
			}

			if (choices === 'Delete department') {
				deleteDepartment();
			}

			if (choices === 'Delete role') {
				deleteRole();
			}

			if (choices === 'Delete employee') {
				deleteEmployee();
			}

			if (choices === 'Quit') {
				db.end();
			}
		});
};
