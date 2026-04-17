const authSchema = require("../models/authSchema");
const { isvalidEmail } = require("../helpers/utils");

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
 
    
    // ------send server data to database
    const user = await authSchema({
      fullName,
      email,
      password,
    });

    await user.save();



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
