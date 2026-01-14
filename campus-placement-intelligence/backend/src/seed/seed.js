const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("../models/student");
const Company = require("../models/Company");
const Application = require("../models/Application");

const connectDB = require("../config/db");

const seedData = async () => {
  try {
    await connectDB();

    await Student.deleteMany();
    await Company.deleteMany();
    await Application.deleteMany();

    const students = await Student.insertMany([
      {
        cgpa: 7.8,
        cgpaBucket: "7.5-8",
        skills: ["DSA", "SQL", "JavaScript"]
      },
      {
        cgpa: 8.4,
        cgpaBucket: "8+",
        skills: ["DSA", "OS", "CN", "Python"]
      },
      {
        cgpa: 6.9,
        cgpaBucket: "6.5-7",
        skills: ["SQL", "JavaScript"]
      }
    ]);

    const companies = await Company.insertMany([
      {
        name: "Amazon",
        role: "SDE Intern",
        minCGPA: 7
      },
      {
        name: "Microsoft",
        role: "Software Intern",
        minCGPA: 7.5
      }
    ]);

    await Application.insertMany([
      {
        student: students[0]._id,
        company: companies[0]._id,
        roundsAttempted: 4,
        roundsCleared: 3,
        finalOutcome: "REJECTED"
      },
      {
        student: students[1]._id,
        company: companies[1]._id,
        roundsAttempted: 5,
        roundsCleared: 5,
        finalOutcome: "SELECTED"
      },
      {
        student: students[2]._id,
        company: companies[0]._id,
        roundsAttempted: 3,
        roundsCleared: 1,
        finalOutcome: "REJECTED"
      }
    ]);

    console.log("✅ Sample data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
