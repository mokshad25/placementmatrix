const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const { companyValidator } = require("../utils/validators");

const {
  createCompany,
  getAllCompanies,
  getCompanyById
} = require("../controllers/company.controller");

router.post("/", validate(companyValidator), createCompany);
router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);

module.exports = router;



