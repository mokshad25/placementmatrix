const Student = require("../models/student");
const asyncHandler = require("../utils/asyncHandler");

const createStudent = asyncHandler(async (req, res) => {
  const student = await Student.create(req.body);

  res.status(201).json({
    success: true,
    data: student
  });
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();

  res.status(200).json({
    success: true,
    data: students
  });
});

const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: student
  });
});

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById
};
