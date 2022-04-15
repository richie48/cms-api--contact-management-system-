const express = require("express");
const {
  registerEmployeeWithOrganization,
  updateEmployeeProfile,
  deleteEmployee,
  getAllEmployeeInOrganization,
} = require("../controllers/employee");

const router = express.Router({ mergeParams: true });

router.route("/").post(registerEmployeeWithOrganization);
router.route("/:id").put(updateEmployeeProfile).delete(deleteEmployee);
router.route("/company/:companyId").get(getAllEmployeeInOrganization);

module.exports = router;
