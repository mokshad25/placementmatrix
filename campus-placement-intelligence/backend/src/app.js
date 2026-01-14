const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/student.routes");
const companyRoutes = require("./routes/company.routes");
const applicationRoutes = require("./routes/application.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", // local frontend
      "https://your-frontend-url.vercel.app" // later
    ],
    credentials: true
  })
);


app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Campus Placement Intelligence API is running"
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/analytics", analyticsRoutes);

// ❗ must be LAST
app.use(errorHandler);

module.exports = app;


