const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const { applicationValidator } = require("../utils/validators");

const {
  createApplication,
  getAllApplications,
  getApplicationsByStudent
} = require("../controllers/application.controller");

router.post("/", validate(applicationValidator), createApplication);
router.get("/", getAllApplications);
router.get("/student/:studentId", getApplicationsByStudent);

module.exports = router;
