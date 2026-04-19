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

// const generateAccessToken = (user) => {
//   const token = jwt.sign(user, process.env.JWT_SEC);
//   return token;
// };

// utils/token.js


// 🔐 Access Token Generate
const generateAccessToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d", 
    }
  );
};

// // 🔍 Verify Token (future use)
// const verifyAccessToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     throw new Error("Invalid or expired token");
//   }
// };



module.exports = { isvalidEmail, generateOTP, generateAccessToken };
