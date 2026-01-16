const express = require("express");
const router = express.Router();

const {
  getCgpaVsSelection,
  getSkillsImpact,
  getCompanyTrends
} = require("../controllers/analytics.controller");

router.get("/cgpa-vs-selection", getCgpaVsSelection);
router.get("/skills-impact", getSkillsImpact);
router.get("/company-trends", getCompanyTrends);

module.exports = router;



