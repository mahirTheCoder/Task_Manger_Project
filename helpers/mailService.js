const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "mahirthecoder.bd@gmail.com",
    pass: "acgg rmko tyze jshm",
  },
});

const mailSender = async ({ email, subject, otp }) => {
  try {
    await transporter.sendMail({
      from: `"Task Manager Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      text: `Your OTP is ${otp}`,
      html: `<h2>Your OTP: ${otp}</h2>`,
    });
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

module.exports = { mailSender };