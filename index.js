const inquirer = require('inquirer');
const fs = require('fs');


// main application which executes at start
function appMenu () {
    // initial menu displays
    inquirer.prompt([
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
        };
    })
}

function viewDepartments() {
    console.log('case 1');
};

function viewRoles() {
    console.log('case 2');
};

function viewEmployees() {
    console.log('case 3');
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

// starts menu on startup
appMenu();