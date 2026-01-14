const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    cgpaBucket: {
      type: String,
      enum: ["6-6.5", "6.5-7", "7-7.5", "7.5-8", "8+"],
      required: true
    },
    skills: {
      type: [String],
      enum: ["DSA", "SQL", "OS", "CN", "JavaScript", "React", "Python"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
