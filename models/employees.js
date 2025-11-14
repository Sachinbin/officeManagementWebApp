const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true, unique: true },
    jobTitle: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
    country: String,
    state: String,
    city: String
});
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;