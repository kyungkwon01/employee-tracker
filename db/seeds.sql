INSERT INTO departments (name) VALUES 
('Administrative'),
('Business'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES 
('Administrative Manager', 90000, 1),
('Administrative Specialist', 60000, 1),
('Account Manager', 90000, 2),
('Account Specialist', 60000, 2),
('Accountant', 100000, 3),
('General Counsel', 150000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Marco', 'Evans', 1, null),
('Zackary', 'Calhoun', 2, 1),
('Lennon', 'Allison', 2, 1),
('Elsie', 'Baker', 1, null),
('Karson', 'Nixon', 2, 4),
('Jeffrey', 'Patterson', 3, null),
('Christopher', 'Gross', 4, 6),
('Tania', 'Tanner', 4, 6),
('Junior', 'Benson', 5, null),
('Bo', 'Ramsey', 6, null);