const {connect} = require("./database");

const withConnection = async (cb) =>{
    const connection = await connect();
    return await cb(connection);
} 

const employeesDB = withConnection((connection)=>({

    // View all departments
    async viewAllDepartments(){
            const [allDepartments] = await connection.query('SELECT * FROM departments;');
            return [allDepartments];
    },
    //add a department
    async addDepartment(department){
        const newDepartment =  await connection.query('INSERT INTO departments SET ?',department);
        return newDepartment;
    },

    //view all roles
    async viewAllRoles(){
        const [allRoles] = await connection.query('SELECT * FROM roles;');
        return [allRoles];
    },

    ///add a role
    async addRole({}){
        const newRole = await connection.query('INSERT INTO roles SET ?',role);
        return newRole;
    },

    //View all employees
    async viewAllEmployees(){
        allEmployees = await connection.query('SELECT * FROM employees;');
        return allEmployees;
    },

    //add an employee
    async addEmployee(employee){
        const newEmployee = await connection.query('INSERT INTO employees SET ?',
        employee
        );
        return newEmployee;
    },

    // //update an employee role
    async updateEmployee(employeeID, roleID){
        roleUpdate = await connection.query('UPDATE employees SET role_id = ? WHERE id =?',
        [roleID, employeeID]
        );
        return roleUpdate;
    }
}));

module.exports = employeesDB;