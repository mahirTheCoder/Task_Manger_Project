const express = require("express");
const router = express.Router();
const {register , verifyOTP, login,userProfile} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/login", login);
router.get("/profile",  userProfile); 


// router.put("/updateProfile", authMiddleware, authController.updateProfile);
module.exports = router;
