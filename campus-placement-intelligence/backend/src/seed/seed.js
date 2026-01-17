const mongoose = require("mongoose");
const dotenv = require("dotenv");

// MODELS
const Student = require("../models/student.js");
const Company = require("../models/company.js");
const Application = require("../models/application.js");

dotenv.config();

// ---------- CONFIG ----------
const MONGO_URI = process.env.MONGO_URI;

// ---------- SAMPLE DATA ----------
const studentsData = [
  {
    cgpa: 6.8,
    cgpaBucket: "6.5-7",
    skills: ["DSA", "SQL"],
    branch: "CSE",
    graduationYear: 2026
  },
  {
    cgpa: 7.2,
    cgpaBucket: "7-7.5",
    skills: ["Python", "CN"],
    branch: "IT",
    graduationYear: 2025
  },
  {
    cgpa: 7.8,
    cgpaBucket: "7.5-8",
    skills: ["DSA", "Python", "OS"],
    branch: "CSE",
    graduationYear: 2026
  },
  {
    cgpa: 8.4,
    cgpaBucket: "8+",
    skills: ["DSA", "React", "JS"],
    branch: "CSE",
    graduationYear: 2025
  }
];

const companiesData = [
  {
    name: "Amazon",
    sector: "Product",
    role: "SDE Intern",
    minCGPA: 7.0,
    rounds: ["OA", "Technical", "HR"]
  },
  {
    name: "Microsoft",
    sector: "Product",
    role: "Software Engineer",
    minCGPA: 7.5,
    rounds: ["OA", "Technical", "Managerial", "HR"]
  }
];

// ---------- SEED FUNCTION ----------
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seed...");

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Student.deleteMany();
    await Company.deleteMany();
    await Application.deleteMany();
    console.log("🧹 Old data cleared");

    const students = await Student.insertMany(studentsData);
    console.log(`✅ ${students.length} students seeded`);

    const companies = await Company.insertMany(companiesData);
    console.log(`✅ ${companies.length} companies seeded`);

    const applicationsData = [
  {
    studentId: students[0]._id,
    companyId: companies[0]._id,
    roleId: null,

    cgpaAtApplication: 6.8,
    cgpaBucketAtApplication: "6.5-7",
    skillsAtApplication: ["DSA", "SQL"],

    roundsReached: ["OA", "Technical"],
    eliminatedRound: "Technical",
    outcome: "rejected"
  },
  {
    studentId: students[1]._id,
    companyId: companies[0]._id,
    roleId: null,

    cgpaAtApplication: 7.2,
    cgpaBucketAtApplication: "7-7.5",
    skillsAtApplication: ["Python", "CN"],

    roundsReached: ["OA", "Technical", "HR"],
    eliminatedRound: null,
    outcome: "selected"
  },
  {
    studentId: students[2]._id,
    companyId: companies[1]._id,
    roleId: null,

    cgpaAtApplication: 7.8,
    cgpaBucketAtApplication: "7.5-8",
    skillsAtApplication: ["DSA", "Python", "OS"],

    roundsReached: ["OA", "Technical"],
    eliminatedRound: "Technical",
    outcome: "rejected"
  },
  {
    studentId: students[3]._id,
    companyId: companies[1]._id,
    roleId: null,

    cgpaAtApplication: 8.4,
    cgpaBucketAtApplication: "8+",
    skillsAtApplication: ["DSA", "React", "JS"],

    roundsReached: ["OA", "Technical", "HR"],
    eliminatedRound: null,
    outcome: "selected"
  }
];
    const applications = await Application.insertMany(applicationsData);
    console.log(`✅ ${applications.length} applications seeded`);

    console.log("🎉 Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();

