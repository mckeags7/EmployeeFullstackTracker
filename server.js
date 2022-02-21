const inquirer = require('inquirer');
const fs = require('fs');
const util = require("util");
const mysql = require('mysql');
const consoleTable = require('console.table');


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Db4!X92$0",
    database: "employee_tracker"
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start() {
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
          'Add department',
          'Add role',
          'Add employee',
          'Update employee role',
          'Update employee Vice President',
          'View departments',
          'View employees',
          'View employees by department',
          'View roles',
          'Exit',
        ]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === 'Add department') {
          addDepartment();
        } else if(answer.action === "Add role") {
          addRole()
        } else if(answer.action === "Add employee") {
            addEmployee();
        } else if(answer.action === "Update employee role") {
            updateEmployeeRole();
        } else if(answer.action === "Update employee Vice President") {
            updateEmployeeVicePresident();
        } else if(answer.action === "View departments") {
            viewDepartments();
        } else if(answer.action === "View employees") {
            viewEmployees();
        } else if(answer.action === "View employees by department") {
            viewEmployeesByDepartment();
          } else if(answer.action === "View roles") {
            viewRoles();
        } else if(answer.action === "Exit") {
          connection.end();
        }
      });
  }

  function addDepartment() {
    inquirer.prompt([       
        {
         type: 'input',
         name: 'name',
         message: 'Please enter the new department name.'
         }
        ])
         .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO department SET ?",
             {
                name: answer.name,
              },
              function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Your department was created successfully!");
                viewDepartments();
              });
            })
          }
  
    function addRole() {
      inquirer.prompt([       
        {
            type: 'input',
            name: 'title', 
            message: 'Please enter the new role.'
         },
         {
            type: 'input',
            name: 'salary', 
            message: 'Please enter the associated salary.'
         },
         {
            type: 'input',
            name: 'department_id', 
            message: 'Please enter the department id this role is a part of.',
          },
         ])
         .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "Insert into role set ?",
              {
               title: answer.title, 
               salary: answer.salary, 
               department_id: answer.department_id
              },
              function(err) {
                if (err) throw err;
                console.log("Your role was created successfully!");
                viewRoles();
              })
         })
        }
        
        let managersArr = [];
function selectManager() {
  managersArr= []
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push
      ({
        name: res[i].first_name + "  " + res[i].last_name,
        value: res[i].id
      });
    }
  })
  return managersArr;
};      



       function addEmployee() {
        inquirer.prompt([       
            {    
                type: 'input',
                name: 'first_name',
                message: 'Please enter the first name of the new employee.'
                },
                {
                type: 'input',
                name: 'last_name',
                message: 'Please enter the last name of the new employee.'
                },
                {
                  type: 'input',
                  name: 'role',
                  message: 'Please enter the role id of the new employee.'
                },
                {
                  type: 'list',
                  name: 'manager_id',
                  message: "Please choose the new employee's Vice President.",
                  choices: selectManager()
                
                }
               ])
             .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                  "INSERT INTO employee SET ?",
                  {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,
                  },
                  function(err) {
                    if (err) throw err;
                    console.log("Your employee was created successfully!");
                    viewEmployees();
                  });
              })
           }


    function updateEmployeeRole() {
        inquirer.prompt([  
          {
            type: 'input',
            name: 'employee_update', 
            message: 'Please enter the employee id whose role you want to update.'
         },
            {
                type: 'input',
                name: 'employee_role_update', 
                message: 'Please enter the updated role id for the employee.'
             }    
         ])
             .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                  'Update employee set role_id = ? where id = ?',
                  [answer.employee_role_update, answer.employee_update],  
                function(err) {
                    if (err) throw err;
                    viewEmployees();
                  });
              })
           }

           function updateEmployeeVicePresident() {
            inquirer.prompt([  
              {
                type: 'input',
                name: 'employee_vp_update', 
                message: 'Please enter the id of the employee whose Vice President you want to update.'
             },
                {
                    type: 'input',
                    name: 'vp_update', 
                    message: 'Please enter the id of the updated Vice President for the employee.'
                 }    
             ])
                 .then(function(answer) {
                    // when finished prompting, insert a new item into the db with that info
                    connection.query(
                      'Update employee SET manager_id = ? where id = ?',
                      [answer.vp_update, answer.employee_vp_update],  
                    function(err) {
                        if (err) throw err;
                        viewEmployees();
                      });
                  })
               }

            function viewDepartments() {
                console.log("Selecting all departments...\n");
                connection.query("SELECT * FROM Department", function(err, res) {
                  if (err) throw err;
                  // Log all results of the SELECT statement
                  console.table(res);
                  start();
                });
              }

          function viewEmployees() {
            console.log("Selecting all employees...\n");
            connection.query("SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.table(res);
              start();
            });
          }

          function viewEmployeesByDepartment() {
            inquirer.prompt([  
              {
                type: 'input',
                name: 'employee_department_view', 
                message: 'Please enter the name of the department you want to view.', 
              }  
             ])
             .then(function(answer) {
            console.log("Selecting department...\n");
            connection.query(
              "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name from role INNER JOIN employee on employee.role_id = role.id INNER JOIN department on department.id = role.id where department.name = ?",
            [answer.employee_department_view],  
            function(err, res) {
                if (err) throw err;
                console.table(res);
                //viewDepartments();
                start();
              });
            })
          }
        
          
          function viewRoles() {
            console.log("Selecting all roles...\n");
            connection.query("SELECT role.id AS id, role.title AS title, role.salary AS salary, department.name AS department FROM role LEFT JOIN department ON department_id = department.id", function(err, res) {
              if (err) throw err;
              console.table(res);
              start();
            });
          }

     