const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getMe
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

module.exports = router;

