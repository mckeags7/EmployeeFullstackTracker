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
    database: "studentbooks"
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
          'Add readings',
          'Add books',
          'Add students',
          'Update student books',
          'View readings',
          'View students',
          'View books',
          'Exit',
        ]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === 'Add readings') {
          addReadings();
        } else if(answer.action === "Add books") {
          addBooks()
        } else if(answer.action === "Add student") {
            addStudent();
        } else if(answer.action === "Update student books") {
            updateStudentBooks();
        } else if(answer.action === "View readings") {
            viewDepartments();
        } else if(answer.action === "View students") {
            viewEmployees();
        } else if(answer.action === "View books") {
            viewRoles();
        } else if(answer.action === "Exit") {
          connection.end();
        }
      });
  }

  function addReadings() {
    inquirer.prompt([       
        {
         type: 'input',
         name: 'name',
         message: 'Please enter the new readings name.'
         }
        ])
         .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO readings SET ?",
             {
                name: answer.name,
              },
              function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Your readings were created successfully!");
                viewReadings();
              });
            })
          }
  
    function addBooks() {
      inquirer.prompt([       
        {
            type: 'input',
            name: 'id', 
            message: 'Please enter the new book id.'
         },
         {
            type: 'input',
            name: 'title', 
            message: 'Please enter the book title.'
         },
         {
            type: 'input',
            name: 'reading_id', 
            message: 'Please enter the reading id for this book.',
          },
         ])
         .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "Insert into books set ?",
              {
               id: answer.id, 
               title: answer.title, 
               reading_id: answer.reading_id
              },
              function(err) {
                if (err) throw err;
                console.log("Your books' library was created successfully!");
                viewBooks();
              })
         }),


       function addStudents() {
        inquirer.prompt([       
            {    
                type: 'input',
                name: 'id',
                message: 'Please enter the id of the new student.'
                },
                {
                type: 'input',
                name: 'name',
                message: 'Please enter the first and last name of the new student.'
                }
               
             .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                  "INSERT INTO students SET ?",
                  {
                    id: answer.id,
                    name: answer.name,
                  },
                  function(err) {
                    if (err) throw err;
                    console.log("Your student was created successfully!");
                    viewStudents();
                  });
              }),
        


                function updateStudentBooks() {
        inquirer.prompt([  
          {
            type: 'input',
            name: 'student_update', 
            message: 'Please enter the student id whose books you want to update.'
         },
            {
                type: 'input',
                name: 'student_books_update', 
                message: 'Please enter the updated book id for the student.'
             }    
         ])
             .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                  'Update student set books_id = ? where id = ?',
                  [answer.student_books_update, answer.student_update],  
                function(err) {
                    if (err) throw err;
                    viewStudents();
                  });
              }),
           
      

         
            function viewReadings() {
                console.log("Selecting all readings from the list...\n");
                connection.query("SELECT * FROM readings", function(err, res) {
                  if (err) throw err;
                  // Log all results of the SELECT statement
                  console.table(res);
                  start();
                });
              }

          function viewStudents() {
            console.log("Selecting all students from the list...\n");
            connection.query("SELECT student.id AS id, student.name AS name, student.student_id AS student_id, books.title, JOIN books ON student.book_id = books.id LEFT JOIN student readings ON readings.id = student.readings_id", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.table(res);
              start();
            },
        
        
          
          function viewBooks() {
            console.log("Selecting all books from the list...\n");
            connection.query("SELECT books.id AS id, books.title AS title, readings.name AS readings FROM books LEFT JOIN readings ON reading_id = readings.id", function(err, res) {
              if (err) throw err;
              console.table(res);
              start();
            
            
          
            })

            sequelize.sync({ force: false }).then(() => {
              app.listen(PORT, () => console.log('Now listening'));
            })
          })
        }
      }
        ])
  }
    }
