const crypto = require('crypto');


const isvalidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
}

module.exports = { isvalidEmail , generateOTP };