// requiring the need libraries  
require("console.table");                   // to format the rows nicely 
const connection = require("./db/database");
const inquirer = require('inquirer');


console.log("WELCOME TO EMPLOYEE TRACKER");

require("./db/db_queries").then(async db => {
    
    // View All Departments 
    async function viewAllDepartments() {
        await db.viewAllDepartments().then(([rows]) => {
            console.table(rows);
        })
    }
    async function addDepartment(){
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the Department you want to add?',
                validate: department => {
                    if (department) {
                      return true;
                    } else {
                      console.log('Please enter Department Info');
                      return false;
                    }
                }
            }
        ])
        await db.addDepartment(answers.department)
        .then(() => console.log(`Added ${answers.department} to the database`))
        
    }

    // View All Roles
    async function viewAllRoles(){
        await db.viewAllRoles().then(([rows]) => {
            console.table(rows);
        })
    }

    // Add a Role
    async function addRole(){
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message:'What is the name of the Role you want to add?',
                validate: title => {
                    if (title) {
                      return true;
                    } else {
                      console.log('Please enter Role Title');
                      return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Please pick which department the Role belongs to',
                choices: async () => (await db.addRoleViewAllDepartments()).map(({ id, name }) => ({
                    name: name,
                    value: id
            }))
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the Salary for this Role?',
                validate: salary => {
                    if (salary) {
                      return true;
                    } else {
                      console.log('Please enter Role Salary');
                      return false;
                    }
                }
            }

        ])
        await db.addRole(answers)
        .then(() => console.log(`Added ${answers.title} Role to the database`))
        }
    

    // choices: async () => (await db.viewAllDepartments()).map(({id, name}) => ({name, value:id}))

    // View All Employees
    async function viewAllEmployees(){
        await db.viewAllEmployees().then(([rows]) => {
            console.table(rows);
        })
    }

    // Add an Employee
    async function addEmployee(){
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message:'What is the First Name of the Employee you want to add?',
                validate: first_name => {
                    if (first_name) {
                      return true;
                    } else {
                      console.log('Please enter the First Name');
                      return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message:'What is the Last Name of the Employee you want to add?',
                validate: last_name => {
                    if (last_name) {
                      return true;
                    } else {
                      console.log('Please enter the Last Name');
                      return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Please pick which Role the Employee belongs to',
                choices: async () => (await db.addEmployeeViewAllRoles()).map(({ title, id }) => ({
                    name: title,
                    value: id
            }))
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Please pick which Manager the Employee belongs to?',
                choices: async () => (await db.addEmployeeViewAllEmployees()).map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }))
            }

        ])
        await db.addEmployee(answers)
        .then(() => console.log(`Added ${answers.first_name} ${answers.last_name} to the database`))
    }

    //Update Employee
    async function updateEmployee(){

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Please pick the Employee you want to update?',
                choices: async () => (await db.addEmployeeViewAllEmployees()).map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }))
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Please pick the New Role you want to assign to the  Employee',
                choices: async () => (await db.addEmployeeViewAllRoles()).map(({ title, id }) => ({
                    name: title,
                    value: id
            }))
            }
        ])
        console.log(answers)
        await db.updateEmployee(answers.id, answers.role_id)
        .then(() => console.log(`Updated ${answers.first_name} ${answers.last_name}'s Role to ${answers.role_id} in the database`))
    }

    let shouldExit = false;
    while (!shouldExit){
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: 
                [
                    {
                        name: "View All Departments",
                        value: "Departments"
                    },
                    {
                        name: 'Add Department',
                        value: 'addDepartment'
                    },
                    {
                        name: 'View All Roles',
                        value: 'Roles'
                    },
                    {
                        name: 'Add Role',
                        value: 'addRole'
                    },
                    {
                        name:"View All Employees",
                        value: "Employees"
                    },
                    {
                        name:"Add Employee",
                        value: "addEmployee"
                    },
                    {
                        name:"Update Employee",
                        value: "updateEmployee"
                    },
                    {
                        name: 'Quit',
                        value: 'Quit'
                    }
                ]
            },
        ])
        switch (answers.choice) {
            case 'Departments':
                await viewAllDepartments();
                break;
            case 'addDepartment':
                await addDepartment();
                break;
            case 'Roles':
                await viewAllRoles();
                break;
            case 'addRole':
                await addRole();
                break;
            case 'Employees':
                await viewAllEmployees();
                break;
            case 'addEmployee':
                await addEmployee();
                break;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ;
            case 'updateEmployee':
                await updateEmployee();
                break;
            // default case 
            default:
                shouldExit = true;
        }
    }
    console.log("Thank You, Come Again.")
    await connection.end();

});

// 
