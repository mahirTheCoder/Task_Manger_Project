const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: "",
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Date,
  },
});



// Pre-save middleware (password hash)
authSchema.pre("save", async function () {
  // Skip hashing if password hasn't been modified
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// // Password compare method (login er jonno)
// authSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model("TaskManager", authSchema);
