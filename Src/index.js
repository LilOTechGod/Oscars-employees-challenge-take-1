// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

// User Story
// AS A manager
// I WANT to generate a webpage that displays my team's basic info
// SO THAT I have quick access to their emails and GitHub profiles


const inquirer = require('inquirer');
const fs = require('fs');
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer))
const Engineer = require('../Lib/Engineer');
const Intern = require('../Lib/Intern');
const Manager = require('../Lib/Manager'); 
const teamMembers = [ ];

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'what is the team managers name?',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the team manager id?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the team manager email',
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the team managers office number',
    }, 
    {
        type: 'loop',
        name: 'employee',
        message: 'Add a new team member?',
        questions: [
        {
            type: 'list',
            name: 'position',
            message: 'What type of employee would you like to add next.',
            choices: ['Manager', 'Intern', 'Engineer'],
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the team members name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the team members id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the team members email',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the managers office numer?',
            when: function(answers) {return answers.position === "Manager"},
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the engineers github username?',
            when: function(answers) {return answers.position === "Engineer"},
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school did the intern attend?',
            when: function(answers) {return answers.position === "Intern"},
        }]
    }
    
];

inquirer.prompt(questions).then(function(response) {createHtml(response)})

function createHtml(response) {
    console.log(response)
    const manager = new Manager (response.name, response.id, response.email, response.officeNumber);
    teamMembers.push(manager);
    for(let i =0; i< response.employee.length; i++) {
        console.log(response.employee[i].position);
        if(response.employee[i].position === "Engineer") {
            console.log("Engineer");
            const engineer = new Engineer (response.employee[i].name, response.employee[i].id, response.employee[i].email, response.employee[i].github);
            teamMembers.push(engineer);
        }
        if(response.employee[i].position === "Intern") {
            const intern = new Intern (response.employee[i].name, response.employee[i].id, response.employee[i].email, response.employee[i].school);
            teamMembers.push(intern);
        }
        if(response.employee[i].position === "Manager") {
            const manager = new Manager (response.employee[i].name, response.employee[i].id, response.employee[i].email, response.employee[i].officeNumber);
            teamMembers.push(manager);
        }
    }
    console.log(teamMembers);
}


//use response to creat emplyee objects with my 