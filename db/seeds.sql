INSERT INTO departments (name) 
VALUES
    ('IT'),
    ('Engineering'),
    ('Sales'),
    ('Marketing');

  INSERT INTO roles (title, salary, department_id)
  VALUES
    ('Manager', 120000, 1),
    ('Assistant Manager', '72000', 1),
    ('Analyst', 60000, 3),
    ('Sr. Analyst', 90000, 3),
    ('Engineer', 70000, 2),
    ('Staff Engineer', 115000, 2);

    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
    ('Ronald', 'Firbank', 5, 2),
    ('Virginia', 'Woolf', 6, 2),
    ('Piers', 'Gaveston', 3, 1),
    ('Charles', 'LeRoi', 4, 1),   
    ('Katherine', 'Mansfield', 1, null),
    ('Dora', 'Carrington', 2, 1),
    ('Edward', 'Bellamy', 6, null);