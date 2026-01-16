const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true
    },
    graduationYear: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

