require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const Employee = require("./models/employees")
const Department  =require("./models/department")

const PORT = process.env.PORT || 3000;
const MongoDB_Url = process.env.MONGODB_URL;
// const url = "mongodb://127.0.0.1:27017/officeDB"

// ------------------ DB CONNECTION ------------------
mongoose.connect(MongoDB_Url)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// ------------------ MIDDLEWARE ------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// Home Redirect
app.get("/", (req, res) => {
    res.redirect("/employees");
});

// Show all employees
app.get("/employees", async (req, res) => {
  const search = req.query.search || "";
  const department = req.query.department || "";
  const jobTitle = req.query.jobTitle || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 5;   

  const departments = await Department.find();

  const query = {};

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }

  if (department) query.department = department;

  if (jobTitle)
    query.jobTitle = { $regex: jobTitle, $options: "i" };

  // Count for pagination
  const total = await Employee.countDocuments(query);

  // Fetch employees with pagination
  const employees = await Employee.find(query)
    .populate("department")
    .populate("supervisor")
    .skip((page - 1) * limit)
    .limit(limit);

  res.render("employees/index", {
    employees,
    search,
    departments,
    department,
    jobTitle,
    total,
    limit,
    page
  });
});


// New employee form
app.get("/employees/new", async (req, res) => {
    const departments = await Department.find();
    const supervisors = await Employee.find();
    res.render("employees/form", { employee: {}, departments, supervisors });
});

// Create new employee
app.post("/employees", async (req, res) => {
    if (!req.body.department) delete req.body.department;
    if (!req.body.supervisor) delete req.body.supervisor;

    await Employee.create(req.body);
    res.redirect("/employees");
});

// Edit employee form
app.get("/employees/:id/edit", async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    const departments = await Department.find();
    const supervisors = await Employee.find({ _id: { $ne: req.params.id } });

    res.render("employees/form", { employee, departments, supervisors });
});

// Update employee
app.put("/employees/:id", async (req, res) => {
    if (!req.body.department) delete req.body.department;
    if (!req.body.supervisor) delete req.body.supervisor;

    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/employees");
    
    
});

app.delete("/employees/:id", async (req, res) => {
    let {id} =req.params
    await Employee.findByIdAndDelete(id)
    console.log("data was deleted")
    res.redirect("/employees");
    
    
});


// ------------------ DEPARTMENT ROUTES  ------------

// Show all departments
app.get("/departments", async (req, res) => {
    const departments = await Department.find();
    res.render("departments/index", { departments });
});

// Create department 
app.post("/departments/new", async (req, res) => {
    await Department.create({ name: req.body.name });
    res.redirect("/departments");
});

// ------------------ SERVER ----
app.listen(PORT, () => console.log("Server running on http://localhost:3000"));
