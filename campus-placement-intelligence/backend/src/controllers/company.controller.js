const Company = require("../models/Company");
const asyncHandler = require("../utils/asyncHandler");

const createCompany = asyncHandler(async (req, res) => {
  const company = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: company
  });
});

const getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find();

  res.status(200).json({
    success: true,
    data: companies
  });
});

const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: company
  });
});

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById
};

