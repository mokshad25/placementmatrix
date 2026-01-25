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
    origin: function (origin, callback) {
      // Allow server-to-server / Postman / curl
      if (!origin) return callback(null, true);

      // Allow localhost
      if (origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      // Allow ALL Vercel frontends
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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



