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
    // View All Roles

    // function addDepartments(){

 

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
                        name: "View All Roles",
                        value: "Roles"
                    },
                    {
                        name: 'Quit',
                        value: 'Quit'
                    }
                ]
            },
        ])
        console.log(answers)
        switch (answers.choice) {
            case 'Departments':
                await viewAllDepartments()
                break;
            case 'Roles':
                await viewAllRoles()
            default:
                shouldExit = true;
        }
    }
    console.log("Thank You, Come Again.")
    await connection.end();

});

// choices: async () => (await db.viewAllDepartments()).map(({id, name}) => ({name, value:id}))
