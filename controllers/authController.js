const authSchema = require("../models/authSchema");
const {
  isvalidEmail,
  generateOTP,
  generateAccessToken,
} = require("../helpers/utils");
const mailSender = require("../helpers/mailService").mailSender;
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // ---- Basic validation
    if (!fullName.trim())
      return res.status(400).send({ message: "Full name is required" });
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!isvalidEmail(email))
      return res.status(400).send({ message: "Invalid email format" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });

    // ---------existing email
    const existingUser = await authSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // ----------generate otp
    const otp = generateOTP();

    // ------send server data to database
    const user = await authSchema({
      fullName,
      email,
      password,
      otp: otp,
      otpExpiry: Date.now() + 5 * 60 * 1000, // OTP valid for 5 minutes
    });

    await user.save();

    // ------------nodemailer mail send

    await mailSender({
      email,
      subject: " OTP verification mail",
      otp: otp,
    });

    //  Success response
    res.status(201).send({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// -------- OTP verification controller
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await authSchema.findOneAndUpdate(
      { email, otp, otpExpiry: { $gt: Date.now() } },
      { isVerified: true },
      { new: true },
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).send({ message: "OTP has expired" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).send({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// ------------login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authSchema.findOne({ email });

    if (!user) return res.status(404).send({ message: "User not found" });
    if (!user.isVerified)
      return res
        .status(401)
        .send({ message: "Please verify your email first" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).send({ message: "Invalid credentials" });

    // -----------generate access token
    const accessToken = generateAccessToken({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });

    res.cookie("accessToken", accessToken);
    console.log(accessToken);

    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// const userProfile = async (req, res) => {
//   try {
//     const user = await authSchema.findOne({ _id: req.user._id }).select('avatar fullName email');
//  if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     } else {
//       res.status(200).send({ user });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal server error" });
//   }

// }

const userProfile = async (req, res) => {
  console.log(req.cookies)

  res.status(200).send({ message: "User profile accessed successfully" });
};

// ----------update profile

// const updateProfile = async (req, res) => {
//   const { fullName, avatar } = req.body;
//   try {
//     const user = await authSchema.findByIdAndUpdate(
//       req.user._id,
//       { fullName, avatar },
//       { new: true }
//     );
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }
//     res.status(200).send({ message: "Profile updated successfully", user });
//   } catch (error) {
//     res.status(500).send({ message: "Internal server error" });
//   }
// };

module.exports = { register, verifyOTP, login, userProfile };
