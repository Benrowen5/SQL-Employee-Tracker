const db = require('./db/connection')

const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');


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
        // if(result.menu === 'view all departments') {
        //     viewDepartments();
        // } else {
        //     console.log('selected other');
        // }
        // switch statement for response handling
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
    const sql = `SELECT * FROM employees`;
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
    console.log('case 4');
};

function addRole() {
    console.log('case 5');
};

function addEmployee() {
    console.log('case 6');
};

function updateRole() {
    console.log('case 7');
};

function close() {
    console.log('close');
}

// starts menu on startup
appMenu();