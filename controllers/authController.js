// const User = require("../models/authSchema");

const { isvalidEmail } = require("../helpers/utils");

// const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {

    // 1. Basic validation
    if(!fullName.trim()) return res.status(400).send({ message: "Full name is required" });
    if(!email) return res.status(400).send({ message: "Email is required" });
    if(!isvalidEmail(email)) return res.status(400).send({ message: "Invalid email format" });
    if(!password) return res.status(400).send({ message: "Password is required" });


    // // 3. Password strength check
    // if (password.length < 6) {
    //   return res.status(400).json({
    //     message: "Password must be at least 6 characters",
    //   });
    // }

    // // 4. Check if user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).json({ message: "Email already exists" });
    // }

    // // 5. Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // // 6. Create new user
    // const newUser = new au({
    //   fullName,
    //   email,
    //   password: hashedPassword,
    // });

    // await newUser.save();

    // 7. Success response
    res.status(201).send({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register };
