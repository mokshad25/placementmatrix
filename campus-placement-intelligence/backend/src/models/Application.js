const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    roundsAttempted: {
      type: Number,
      required: true,
      min: 1
    },
    roundsCleared: {
      type: Number,
      required: true,
      min: 0
    },
    finalOutcome: {
      type: String,
      enum: ["SELECTED", "REJECTED"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
