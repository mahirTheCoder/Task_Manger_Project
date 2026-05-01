const express = require("express");
const multer  = require('multer')
const upload = multer()
// -------secound way to upload file
// const { upload } = require("../helpers/multerService");

const router = express.Router();
const {register , verifyOTP, login,userProfile , updateProfile} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/login", login);
router.get("/profile", authMiddleware, userProfile); 
router.put("/updateProfile", authMiddleware, upload.single('avatar'), updateProfile);


module.exports = router;
