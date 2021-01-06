use employees;

INSERT INTO departments
    (name)
VALUES
    ('Avengers'),
    ('Justice League'),
    ('Doom Patrol'),
    ('Titans'),
    ('Legion');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('CTO', 100000, 1),
    ('Captian', 1000, 1),
    ('Weather', 1000, 1),
    ('Targeting', 34440, 2),
    ('Recon', 10000, 2),
    ('Research', 100000, 5),
    ('Sidekicks', 100, 4),
    ('Strange', 10, 3);

INSERT INTO employees
   (first_name, last_name, role_id, manager_id)
VALUES
    ('Tony', 'Stark', 1, NULL),
    ('Steve', 'Rogers', 2, 1),
    ('Thor', 'Odinson', 3, NULL),
    ('Robert', 'Queen', 4, 3),
    ('Bruce', 'Wayne', 5, NULL),
    ('Barry', 'Allen', 6, 5),
    ('Helen', 'Troy', 7, NULL),
    ('Peter', 'Parker', 8, 2);

