const express = require("express");

const router = express.Router();

// Controller
const { register, login, logout, checkAuth } = require("../controllers/auth");

//Import middlewares
const { auth } = require("../middlewares/auth");

// Route
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
router.get("/logout", auth, logout);

module.exports = router;
