const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const isvalidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateOTP = () => {
  // --------- Generate a random 4-digit OTP
  return crypto.randomInt(1000, 10000).toString();
};

const generateAccessToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SEC);
  return token;
};

module.exports = { isvalidEmail, generateOTP, generateAccessToken };
