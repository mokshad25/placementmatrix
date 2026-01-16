const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },

    cgpaAtApplication: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },

    cgpaBucketAtApplication: {
      type: String,
      required: true
    },

    skillsAtApplication: {
      type: [String],
      required: true
    },

    roundsReached: {
      type: [String],
      default: []
    },

    eliminatedRound: {
      type: String,
      default: null
    },

    outcome: {
      type: String,
      enum: ["selected", "rejected"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
