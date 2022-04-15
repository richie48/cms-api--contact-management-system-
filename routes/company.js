const express = require("express");
const {
  registerCompany,
  getCompanies,
  deleteCompany,
  updateCompany,
} = require("../controllers/company");

const employeeRoute = require("./employee");

const router = express.Router({ mergeParams: true });

router.route("/register").post(registerCompany);
router.route("/").get(getCompanies);
router.route("/:id").delete(deleteCompany).put(updateCompany);

//redirect to employee route
router.use("/:companyId/register", employeeRoute);

module.exports = router;
