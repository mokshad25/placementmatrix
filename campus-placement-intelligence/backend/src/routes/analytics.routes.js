const express = require("express");
const router = express.Router();

const { analyticsRateLimiter } = require("../middlewares/rateLimit.middleware");

const {
  cgpaVsSelection,
  skillsImpact,
  companyTrends
} = require("../controllers/analytics.controller");

// Apply rate limiting ONLY to analytics
router.use(analyticsRateLimiter);

router.get("/cgpa-vs-selection", cgpaVsSelection);
router.get("/skills-impact", skillsImpact);
router.get("/company-trends", companyTrends);

module.exports = router;




