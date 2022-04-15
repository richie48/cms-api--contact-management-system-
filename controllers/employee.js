const asyncHandler = require("express-async-handler");
const Employee = require("../model/Employee");

// To create/register an employee and his/her contact info to an organization
//  http://localhost:5000/api/company/:companyId/register
exports.registerEmployeeWithOrganization = asyncHandler(async (req, res) => {
  req.body.company = req.params.companyId;
  const { email } = req.body;

  const userExist = await Employee.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Employee already exist");
  }

  const employee = await Employee.create(req.body);

  if (employee) {
    res.status(201).json(employee);
  } else {
    res.status(400);
    throw new Error("Invalid employee data");
  }
});

//To delete an employee contact details from the database
//http://localhost:5000/api/employee/:id
exports.deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    await employee.remove();
    res.status(201).json({});
  } else {
    res.status(404);
    throw new Error("employee not found");
  }
});

//route to update an employee contact details
//http://localhost:5000/api/employee/:id
exports.updateEmployeeProfile = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;

    //if the password was also updated...
    if (req.body.password) {
      employee.password = req.body.password;
    }

    const updatedUser = await employee.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

//gets all employees in a company
//http://localhost:5000/api/employee/company/:companyId
exports.getAllEmployeeInOrganization = asyncHandler(async (req, res) => {
  //gets the companyid from the url and pass as field
  if (req.params.companyId) {
    const employees = await Employee.find({ company: req.params.companyId });
    return res.status(200).json(employees);
  } else {
    res.status(404);
    throw new Error("No company found with this employee");
  }
});
