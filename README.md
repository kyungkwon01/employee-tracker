# Employee Tracker

## Table of Contents

- [Description](#description)
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)
- [Contact](#contact)

## Description

The Employee Tracker app is a command-line application built using Node.js that allows you to manage employee information using an SQL database. It utilizes the inquirer package for user input and the mysql2 package to interact with the database.

## Demo

(https://drive.google.com/file/d/1As-dsHMfFom5uLDyank4GRAJGZH5mCFI/view?usp=drive_link)

## Features

- View Departments: Display a list of all departments in the company.
- View Roles: Display a list of all roles available in the company, including the department and salary associated with each role.
- View Employees: Display a list of all employees with their details such as name, role, department, salary, and manager.
- Add Department: Add a new department to the database.
- Add Role: Add a new role to the database.
- Add Employee: Add a new employee to the database.
- Update Employee Role: Update the role of an existing employee.
- Update Employee Manager: Update the manager of an existing employee.
- View Employee by department: List employees by department.
- Delete Department: Remove a department from the database.
- Delete Role: Remove a role from the database
- Delete Employee: Remove an employee from the database

## Installation

To install and run the Note Taker, follow these steps:

1. Clone this repository to your local machine or download the source code as a ZIP file.

2. Ensure that you have Node.js installed on your system. You can download it from the official Node.js website: https://nodejs.org.

3. Open a terminal or command prompt and navigate to the project's root directory.

4. Run the following command to install the required dependencies: `npm install`

5. Set up your MySQL database by importing the provided schema and sample data files. You can use tools like MySQL Workbench or the command line to import the SQL files:

- schema.sql: Contains the database schema definition.
- seed.sql: Contains sample data for testing purposes (optional).

6. Configure the database connection by updating the connection object in the server.js file with your MySQL database credentials:

- host: 'localhost',
- port: 3306,
- user: 'your_username',
- password: 'your_password',
- database: 'employee_db'

7. Once the dependencies are installed successfully, start the application using the following command: `npm start` or `node server.js`

## Usage

1. To start the Employee Tracker app, run the following command in your terminal from the project directory: `node server.js`
2. The app will present a menu of options. Use the arrow keys to navigate through the menu and press Enter to select an option. Follow the prompts to perform various actions such as adding or updating employee information, viewing employee data, or deleting employees.

## Dependencies

The Employee Tracker relies on the following npm modules:

- node.js: A JavaScript runtime environment.
- inquirer: A collection of common interactive command-line user interfaces.
- mysql2: A Node.js driver for MySQL that provides an easy way to interact with the MySQL database.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contact

If you have any questions, feel free to reach out through my email.

kyungkwon01@gmail.com
