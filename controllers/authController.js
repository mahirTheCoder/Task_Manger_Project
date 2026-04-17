const register = async (req, res) => {
    const { fullName, email, password } = req.body;
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {register};
