const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/student.routes");
const companyRoutes = require("./routes/company.routes");
const applicationRoutes = require("./routes/application.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const authRoutes = require("./routes/auth.routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

/* ======================
   GLOBAL MIDDLEWARES
====================== */

// ✅ CORS (frontend → backend)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://your-frontend-url.vercel.app" // production frontend (replace later)
    ],
    credentials: true
  })
);

// ✅ Parse JSON body (MUST be before routes)
app.use(express.json());

/* ======================
   ROUTES
====================== */

// 🔐 Auth routes
app.use("/api/auth", authRoutes);

// 🩺 Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Campus Placement Intelligence API is running 🚀"
  });
});

// 📦 Core APIs
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/analytics", analyticsRoutes);

/* ======================
   ERROR HANDLER (LAST)
====================== */

app.use(errorHandler);

module.exports = app;



