const db = require('./db/connection')

const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table'); 

var currentRoles = [];
var currentEmployees = [];
var currentDepartments = [];

// functions to store table data for prompts
function allEmployees () {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
        }
        // push each current department to array 
        for (i=0; i<rows.length; i++) {
            currentEmployees.push(rows[i].first_name + ' ' + rows[i].last_name);           
        }
    });
};

function allDepartments () {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
        }
        // push each current department to array 
        for (i=0; i<rows.length; i++) {
            currentDepartments.push(rows[i].name);           
        }
    });
};

function allRoles () {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
        }
        // push each current department to array 
        for (i=0; i<rows.length; i++) {
            currentRoles.push(rows[i].title);           
        }
    });
};

// main application which executes at start
function appMenu () {
    // initial menu displays
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'view all departments', 
                'view all roles', 
                'view all employees', 
                'add new department',
                'add new role',
                'add new employee',
                'update employee role',
                'close'    
            ]
        }
    ])
    .then(result => {
        switch (result.menu) {
            case 'view all departments':
                viewDepartments();
                break;
            case 'view all roles':
                viewRoles();
                break;
            case 'view all employees':
                viewEmployees();
                break;
            case 'add new department':
                addDepartment();
                break;
            case 'add new role':
                addRole();
                break;
            case 'add new employee':
                addEmployee();
                break;
            case 'update employee role':
                updateRole();
                break;
            case 'close':
                closeApp();
                break;
        };
    });
};

function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        // returns to the main menu
        appMenu();
    });   
};

function viewRoles() {
    const sql = `
    SELECT roles.id, title, salary, departments.name AS department
    FROM roles
    INNER JOIN departments ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        // returns to the main menu
        appMenu();
    });
};

function viewEmployees() {
    const sql = 
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees   
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager on manager.id = employees.manager_id `;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows);
        // returns to the main menu
        appMenu();
    });  
};

function addDepartment() {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'department',
            message: "Please enter the new department's name:",
            validate: departmentInput => {
                if(departmentInput) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then(result => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const param = result.department;        
        db.query(sql, param, (err, rows) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log("New department has been added!");
            // returns to the main menu
            appMenu();
        })
    })
    .catch(err => {
        if(err) {
            console.log(err)
            return;
        }
    })
};

function addRole() {
    // get array of department options for role to be added to
    allDepartments();
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Please enter the title of the role:',
            validate: roleInput => {
                if(roleInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please provide the salary for this role:',
            validate: salary => {
                if(salary > 0) {
                    return true;
                } else {
                    console.log('A numeric value greater than 0 must be provided.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to?',
            choices: currentDepartments
        }
    ])
    .then(result => {
        const newDeptId = currentDepartments.indexOf(result.department) + 1; 
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
        const params = [result.role, result.salary, newDeptId];
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log("New role has been added!");
            // returns to the main menu
            appMenu();
        });
    })
    .catch(err => {
        console.log(err)
    });   
};

function addEmployee() {
    allRoles();
    allEmployees();
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "Please enter the employee's first name:",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Please enter the employee's last name:",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "Please select the employee's role:",
            choices: currentRoles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Please select the manager for this employee:',
            choices: currentEmployees,
        }
    ])
    .then(result => {
        const newRoleId = currentRoles.indexOf(result.role) + 1;
        const newManagerId = currentEmployees.indexOf(result.manager) + 1;

        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const params = [result.firstName, result.lastName, newRoleId, newManagerId];
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log(rows);
            console.log("New employee has been added!");
            // returns to the main menu
            appMenu();
        });
    })
};

function updateRole() {
    console.log('case 7');
};

function close() {
    console.log('close');
}

// starts menu on startup
appMenu();