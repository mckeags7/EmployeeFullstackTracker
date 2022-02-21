INSERT INTO department
(name
)
VALUES
("marketing"
),
("art_and_editorial"
),
("software"
),
("sales"
),
("hr"
),
("executive"
);

INSERT INTO role
( title, salary, department_id
)
VALUES
("associate", 60000, 1
),
("graphic_artist", 75000, 2
),
("editor", 65000, 2
),
("web_developer", 70000, 3
),
("sales_rep", 65000, 4
),
("manager", 85000, 5
),
("vice-president", 100000, 6
);

INSERT INTO employee
(first_name, last_name, role_id, manager_id
)
VALUES
("Sean", "Mckeag", 4, 1
),
("Patrick", "Johnson", 2, 2
),
("Emma", "Crampton", 3, 1
),
("Itai", "Gruss", 4, 1
),
("Shareef", "Keyes", 5, 1
),
("Eleanor", "Lambert", 7, null
),
("Gabriel", "Gomez", 7, null
),
("Nick", "Guy", 6, 2
),
("Claire", "Jamison", 1, 2
),
("Rob", "Andrews", 1, 1
),
("Rachel", "Greene", 5, 2
),
("Joseph", "Daniels", 1, 1
),
("Natalie", "Ericsson", 5, 1
),
("Olivia", "Johnson", 4, 2
)
;


