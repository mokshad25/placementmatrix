const Application = require("./models/Application");

const seedApplications = async () => {
  await Application.deleteMany();

  await Application.insertMany([
    {
      studentId: "REPLACE_WITH_REAL_ID",
      companyId: "REPLACE_WITH_REAL_ID",
      roleId: "REPLACE_WITH_REAL_ID",
      cgpaAtApplication: 7.8,
      cgpaBucketAtApplication: "7.5-8.0",
      skillsAtApplication: ["DSA", "Java"],
      roundsReached: ["OA", "Technical"],
      eliminatedRound: "Technical",
      outcome: "rejected"
    }
  ]);

  console.log("✅ Applications seeded");
};

module.exports = seedApplications;
