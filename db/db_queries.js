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
    async addRoleViewAllDepartments(){
        const [allDepartments] = await connection.query('SELECT * FROM departments;');
        return allDepartments;
},
    //add a department
    async addDepartment(department){
        const newDepartment =  await connection.query("INSERT INTO departments SET name =?",department);
        return newDepartment;
    },

    //view all roles
    async viewAllRoles(){
        const [allRoles] = await connection.query(`SELECT 
        roles.id AS Role_ID, 
        roles.title AS Role_Title, 
        departments.name AS Department, 
        roles.salary AS Salary
        FROM roles LEFT JOIN departments ON
        roles.department_id = departments.id;`);
        return [allRoles];
    },

    ///add a role
    async addRole(role){
        const [newRole] = await connection.query('INSERT INTO roles SET ?', role);
        return newRole;
    },

    //View all employees
    async viewAllEmployees(){
        allEmployees = await connection.query(`SELECT 
        employees.id AS Employee_ID,
        employees.first_name, 
        employees.last_name,
        roles.title AS Job_Title,
        departments.name AS Department,
        roles.salary AS Salary,
        CONCAT (manager.first_name, ' ', manager.last_name) AS Manager 
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees manager ON manager.id = employees.manager_id;`);
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