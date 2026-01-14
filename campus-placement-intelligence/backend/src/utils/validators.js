const Joi = require("joi");

/**
 * Student validation
 */
const studentValidator = Joi.object({
  cgpa: Joi.number().min(0).max(10).required(),
  cgpaBucket: Joi.string()
    .valid("6-6.5", "6.5-7", "7-7.5", "7.5-8", "8+")
    .required(),
  skills: Joi.array()
    .items(
      Joi.string().valid(
        "DSA",
        "SQL",
        "OS",
        "CN",
        "JavaScript",
        "React",
        "Python"
      )
    )
    .min(1)
    .required()
});

/**
 * Company validation
 */
const companyValidator = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
  minCGPA: Joi.number().min(0).max(10).required()
});

/**
 * Application validation
 */
const applicationValidator = Joi.object({
  student: Joi.string().required(),
  company: Joi.string().required(),
  roundsAttempted: Joi.number().min(1).required(),
  roundsCleared: Joi.number().min(0).required(),
  finalOutcome: Joi.string().valid("SELECTED", "REJECTED").required()
});

module.exports = {
  studentValidator,
  companyValidator,
  applicationValidator
};
