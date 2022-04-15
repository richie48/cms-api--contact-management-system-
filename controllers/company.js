const asyncHandler = require("express-async-handler");
const Company = require("../model/Company");

//create or register a company
//http://localhost:5000/api/company/register
exports.registerCompany = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const companyExist = await Company.findOne({ email });

  if (companyExist) {
    res.status(400);
    throw new Error("company exist");
  }

  const company = await Company.create(req.body);

  if (company) {
    res.status(201).json(company);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//get all registered companies...with pagination of 5 per page
//http://localhost:5000/api/company/
exports.getCompanies = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Company.countDocuments();
  const companies = await Company.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ companies, page, pages: Math.ceil(count / pageSize) });
});

//delete a company
//http://localhost:5000/api/company/:id
exports.deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    await company.remove();
    res.json({ message: "company removed" });
  } else {
    res.status(404);
    throw new Error("company not found");
  }
});

//update a company
//http://localhost:5000/api/company/:id
exports.updateCompany = asyncHandler(async (req, res) => {
  let company = await Company.findById(req.params.id);

  if (company) {
    company = await Company.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(company);
  } else {
    res.status(404);
    throw new Error("company not found");
  }
});
