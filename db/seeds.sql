INSERT departments (name) INTO 
VALUES
("Engineering"), 
("Finance"), 
("Sales"), 
("HR");

INSERT INTO role (title, salary, department_id) 
VALUES
("Senior Engineer", 150000, 1),
("Associate Engineer", 100000, 1),
("Senior Accountant", 100000, 2),
("Associate Accountant", 800000, 2),
("Sales", 600000, 3),
("HR", 500000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
("Johnny", "Depp", 1, NULL)
("Arnold", "Schwarzenegger", 2, 1)
("Jim", "Carrey", 3, NULL)
("Emma", "Watson", 4, NULL)
("Robert", "Downey", 1, NULL)
("Daniel", "Radcliffe", 2, 1)
("Chris", "Evans", 3, NULL)
("Leonardo", "DiCaprio", 4, NULL)
("Tom", "Cruise", 1, NULL)
("Brad", "Pitt", 3, NULL)