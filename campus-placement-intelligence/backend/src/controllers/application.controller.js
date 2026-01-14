const Application = require("../models/Application");
const Student = require("../models/student");
const Company = require("../models/Company");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const createApplication = asyncHandler(async (req, res) => {
  const { student, company } = req.body;

  const studentExists = await Student.findById(student);
  if (!studentExists) {
    throw new ApiError(404, "Student not found");
  }

  const companyExists = await Company.findById(company);
  if (!companyExists) {
    throw new ApiError(404, "Company not found");
  }

  const application = await Application.create(req.body);

  res.status(201).json({
    success: true,
    data: application
  });
});

const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find()
    .populate("student", "cgpa cgpaBucket skills")
    .populate("company", "name role");

  res.status(200).json({
    success: true,
    data: applications
  });
});

const getApplicationsByStudent = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    student: req.params.studentId
  }).populate("company", "name role");

  res.status(200).json({
    success: true,
    data: applications
  });
});

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationsByStudent
};

