const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config();

const db = mysql.createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
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

showDepartments = () => {
	console.log('Showing all Departments...\n');
	const sql = `SELECT 
    department.id AS id, 
    department.name AS department FROM department`;

	db.query(sql, (err, rows) => {
		if (err) throw err;
		console.table(rows);
		promptUser();
	});
};

showRoles = () => {
	console.log('Showing all Roles...\n');
	const sql = `SELECT 
    role.id, 
    role.title, 
    department.name AS department FROM role
    INNER JOIN department ON role.department_id = department.id`;

	db.query(sql, (err, rows) => {
		if (err) throw err;
		console.table(rows);
		promptUser();
	});
};

showEmployees = () => {
	console.log('Showing all Employees...\n');
	const sql = `SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department,
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

	db.query(sql, (err, rows) => {
		if (err) throw err;
		console.table(rows);
		promptUser();
	});
};

addDepartment = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'addDept',
				message: 'What department do you want to add?',
				validate: (addDept) => {
					if (addDept) {
						return true;
					} else {
						console.log('Please enter a department');
						return false;
					}
				},
			},
		])
		.then((answer) => {
			const sql = `INSERT INTO department (name) VALUES (?)`;
			db.query(sql, answer.addDept, (err, result) => {
				if (err) throw err;
				console.log('Added ' + answer.addDept + ' to departments!');

				showDepartments();
			});
		});
};

addRole = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'role',
				message: 'What role do you want to add?',
				validate: (addRole) => {
					if (addRole) {
						return true;
					} else {
						console.log('Please enter a role');
						return false;
					}
				},
			},
			{
				type: 'input',
				name: 'salary',
				message: 'What is the salary of this role?',
				validate: (addSalary) => {
					if (isNAN(addSalary)) {
						return true;
					} else {
						console.log('Please enter a salary');
						return false;
					}
				},
			},
		])
		.then((answer) => {
			const params = [answer.role, answer.salary];
			const roleSql = `SELECT 
			name, 
			id FROM department`;

			db.promise().query(roleSql, (err, data) => {
				if (err) throw err;

				const dept = data.map(({ name, id }) => ({ name: name, value: id }));

				inquirer
					.prompt([
						{
							type: 'list',
							name: 'dept',
							message: 'What department is this role in?',
							choices: dept,
						},
					])
					.then((deptChoice) => {
						const dept = deptChoice.dept;
						params.push(dept);

						const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

						db.query(sql, params, (err, result) => {
							if (err) throw err;
							console.log('Added' + answer.role + ' to roles!');

							showRoles();
						});
					});
			});
		});
};

addEmployee = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'fistName',
				message: "What is the employee's first name?",
				validate: (addFirst) => {
					if (addFirst) {
						return true;
					} else {
						console.log('Please enter a first name');
						return false;
					}
				},
			},
			{
				type: 'input',
				name: 'lastName',
				message: "What is the employee's last name?",
				validate: (addLast) => {
					if (addLast) {
						return true;
					} else {
						console.log('Please enter a last name');
						return false;
					}
				},
			},
		])
		.then((answer) => {
			const params = [answer.fistName, answer.lastName];
			const roleSql = `SELECT 
			role.id, 
			role.title FROM role`;

			db.promise().query(roleSql, (err, data) => {
				if (err) throw err;

				const roles = data.map(({ id, title }) => ({ name: title, value: id }));

				inquirer
					.prompt([
						{
							type: 'list',
							name: 'role',
							message: "What is the employee's role?",
							choices: roles,
						},
					])
					.then((roleChoice) => {
						const role = roleChoice.role;
						params.push(role);

						const managerSql = `SELECT * FROM employee`;

						db.promise().query(managerSql, (err, data) => {
							if (err) throw err;

							const managers = data.map(({ id, first_name, last_name }) => ({
								name: first_name + ' ' + last_name,
								value: id,
							}));

							inquirer
								.prompt([
									{
										type: 'list',
										name: 'manager',
										message: "Who is the employee's manager?",
										choices: managers,
									},
								])
								.then((managerChoice) => {
									const manager = managerChoice.manager;
									params.push(manager);

									const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

									db.query(sql, params, (err, result) => {
										if (err) throw err;
										console.log('Employee has been added!');

										showEmployees();
									});
								});
						});
					});
			});
		});
};

updateEmployee = () => {
	const employeeSql = `SELECT * FROM employee`;

	db.promise().query(employeeSql, (err, data) => {
		if (err) throw err;

		const employees = data.map(({ id, first_name, last_name }) => ({
			name: first_name + ' ' + last_name,
			value: id,
		}));

		inquirer
			.prompt([
				{
					type: 'list',
					name: 'name',
					message: 'Which employee would you like to update?',
					choices: employees,
				},
			])
			.then((empChoice) => {
				const employee = empChoice.name;
				const params = [];
				params.push(employee);

				const roleSql = `SELECT * FROM role`;

				db.promise().query(roleSql, (err, data) => {
					if (err) throw err;

					const roles = data.map(({ id, title }) => ({
						name: title,
						value: id,
					}));

					inquirer
						.prompt([
							{
								type: 'list',
								name: 'role',
								message: "What is the employee's new role?",
								choices: roles,
							},
						])
						.then((roleChoice) => {
							const role = roleChoice.role;
							params.push(role);

							let employee = params[0];
							params[0] = role;
							params[1] = employee;

							const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

							db.query(sql, params, (err, result) => {
								if (err) throw err;
								console.log('Employee has been updated!');

								showEmployees();
							});
						});
				});
			});
	});
};

updateManager = () => {
	const employeeSql = `SELECT * FROM employee`;

	db.promise().query(employeeSql, (err, data) => {
		if (err) throw err;

		const employees = data.map(({ id, first_name, last_name }) => ({
			name: first_name + ' ' + last_name,
			value: id,
		}));

		inquirer
			.prompt([
				{
					type: 'list',
					name: 'name',
					message: 'Which employee would you like to update?',
					choices: employees,
				},
			])
			.then((empChoice) => {
				const employee = empChoice.name;
				const params = [];
				params.push(employee);

				const managerSql = `SELECT * FROM employee`;

				db.promise().query(managerSql, (err, data) => {
					if (err) throw err;

					const managers = data.map(({ id, first_name, last_name }) => ({
						name: first_name + ' ' + last_name,
						value: id,
					}));

					inquirer
						.prompt([
							{
								type: 'list',
								name: 'manager',
								message: "Who is the employee's manager?",
								choices: managers,
							},
						])
						.then((managerChoice) => {
							const manager = managerChoice.manager;
							params.push(manager);

							let employee = params[0];
							params[0] = manager;
							params[1] = employee;

							const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

							db.query(sql, params, (err, result) => {
								if (err) throw err;
								console.log('Employee has been updated!');

								showEmployees();
							});
						});
				});
			});
	});
};

employeeDepartment = () => {
	console.log('Showing employee by departments...\n');
	const sql = `SELECT 
	employee.first_name, 
	employee.last_name, 
	department.name AS department FROM employee 
	LEFT JOIN role ON employee.role_id = role.id 
	LEFT JOIN department ON role.department_id = department.id`;

	db.promise().query(sql, (err, rows) => {
		if (err) throw err;
		console.table(rows);
		promptUser();
	});
};

deleteDepartment = () => {
	const deptSql = `SELECT * FROM department`;

	db.query(deptSql, (err, data) => {
		if (err) throw err;

		const dept = data.map(({ name, id }) => ({ name: name, value: id }));

		inquirer
			.prompt([
				{
					type: 'list',
					name: 'dept',
					message: 'What department do you want to delete?',
					choices: dept,
				},
			])
			.then((deptChoice) => {
				const dept = deptChoice.dept;
				const sql = `DELETE FROM department WHERE id = ?`;

				db.query(sql, dept, (err, result) => {
					if (err) throw err;
					console.log('Successfully deleted!');

					showDepartments();
				});
			});
	});
};

deleteRole = () => {
	const roleSql = `SELECT * FROM role`;

	db.promise().query(roleSql, (err, data) => {
		if (err) throw err;

		const role = data.map(({ title, id }) => ({ name: title, value: id }));

		inquirer
			.prompt([
				{
					type: 'list',
					name: 'role',
					message: 'What role do you want to delete?',
					choices: role,
				},
			])
			.then((roleChoice) => {
				const role = roleChoice.role;
				const sql = `DELETE FROM role WHERE id = ?`;

				db.query(sql, role, (err, result) => {
					if (err) throw err;
					console.log('Successfully deleted!');

					showRoles();
				});
			});
	});
};

deleteEmployee = () => {
	const employeeSql = `SELECT * FROM employee`;

	db.promise().query(employeeSql, (err, data) => {
		if (err) throw err;

		const employees = data.map(({ id, first_name, last_name }) => ({
			name: first_name + ' ' + last_name,
			value: id,
		}));

		inquirer
			.prompt([
				{
					type: 'list',
					name: 'name',
					message: 'Which employee would you like to delete?',
					choices: employees,
				},
			])
			.then((empChoice) => {
				const employee = empChoice.name;

				const sql = `DELETE FROM employee WHERE id = ?`;

				db.query(sql, employee, (err, result) => {
					if (err) throw err;
					console.log('Successfully Deleted!');

					showEmployees();
				});
			});
	});
};
