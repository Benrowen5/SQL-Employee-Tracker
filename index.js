const db = require('./db/connection')

const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const { SIGALRM } = require('constants');

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
        // const currentDepartments = rows.map(({id, name}) => {
        //     {value: id,
        //     name: `${id} ${name}`}
        // });
        // returns to the main menu
        appMenu();
    });   
};

function viewRoles() {
    const sql = `SELECT * FROM roles`;
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
    const sql = `SELECT * FROM employees
                `;
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
            type: 'input',
            name: 'department',
            message: 'Which department does this role belong to?',
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
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
        const params = [result.role, result.salary, result.department];
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
    
};

function addEmployee() {
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
            type: 'input',
            name: 'role',
            message: "Please provide the employee's role-id:",
            validate: role => {
                if(role) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Please provide the manager-id for this employee:',
            validate: manager => {
                if(manager) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then(result => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const params = [result.firstName, result.lastName, result.role, result.manager];
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
                return;
            }
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