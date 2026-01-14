const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const { studentValidator } = require("../utils/validators");

const {
  createStudent,
  getAllStudents,
  getStudentById
} = require("../controllers/student.controller");

router.post("/", validate(studentValidator), createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);

module.exports = router;
