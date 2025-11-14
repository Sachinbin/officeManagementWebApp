Office Management System

This is a simple Office Management System built using Node.js, Express, MongoDB, Mongoose, EJS, and Bootstrap.
It allows you to manage employees and departments.

Features
Employees

Add employee

View all employees

Edit employee

Delete employee

Assign department

Assign supervisor

Search by name, email

Filter by department

Filter by job title

Pagination

Departments

Add department

View department list

Edit department

Delete department

Technologies Used

Node.js

Express.js

MongoDB

Mongoose

EJS (template engine)

Bootstrap (for UI)

Project Folder Structure
officeManage2/
  app.js
  models/
      Employee.js
      Department.js
  views/
      layouts/
          main.ejs
      employees/
          index.ejs
          new.ejs
      departments/
          index.ejs
  public/
      css/
          style.css
  package.json

How to Install

Download or clone the project

Open project folder

Install dependencies:

npm install


Start server:

node app.js


Open browser:

http://localhost:5000

environment variable (If needed)

If using .env, create a file:

MONGO_URI=your_mongodb_url
PORT=5000

Routes Overview
Employee Routes

GET /employees

GET /employees/new

POST /employees

GET /employees/:id/edit

POST /employees/:id

POST /employees/:id/delete

Department Routes

GET /departments

GET /departments/new

POST /departments

GET /departments/:id/edit

POST /departments/:id

POST /departments/:id/delete

How it works

Data is stored in MongoDB

EJS is used for frontend pages

Bootstrap makes pages responsive

All routes and logic are written inside app.js

Models are stored inside the models folder
