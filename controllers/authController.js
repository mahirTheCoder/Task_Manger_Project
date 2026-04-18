const authSchema = require("../models/authSchema");
const { isvalidEmail, generateOTP } = require("../helpers/utils");
const mailSender = require("../helpers/mailService").mailSender;
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

module.exports = { register };
