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
        await db.addDepartment(answers.department).then(()=> {
            db.viewAllDepartments().then(([rows]) => {
                console.table(rows);
                console.log("Press Up, Down or Enter keys to get back to the Prompts")
            });
        });
        
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
        .then(() => console.log(`Added ${title} to the database`))
        }
    

    // choices: async () => (await db.viewAllDepartments()).map(({id, name}) => ({name, value:id}))

    // View All Employees
    async function viewAllEmployees(){
        await db.viewAllEmployees().then(([rows]) => {
            console.table(rows);
        })
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
            // case 
            default:
                shouldExit = true;
        }
    }
    console.log("Thank You, Come Again.")
    await connection.end();

});

// 
