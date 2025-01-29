const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const hashedPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = (plainText, password) => {
  return bcrypt.compare(plainText, password);
};

const generateAccessToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "5m" }
  );
  return token;
};

const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "5m" }
  );
  return token;
};

const authMiddleWare = async (req, res, next) => {
  //   const token = req.headers["authorization"];
  const token = req.cookies.accessToken;
  if (!token) {
    return res.json({
      message: "token require",
    });
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.json({
        message: "invalid token",
      });
    }
    req.user = user;
    console.log("req user", req.user);
    next();
  });
};

module.exports = {
  hashedPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  authMiddleWare,
};
