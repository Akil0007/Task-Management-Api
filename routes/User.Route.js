const express = require("express");
const { register, login, logout } = require("../controllers/User.Controller");
const errorHandler = require("../errorHandler");
const { validateRegister, validateLogin } = require("../validate/validate");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

router.use(errorHandler);

module.exports = router;
