const nodemailer = require("nodemailer");
const { otpEmailTemplates } = require("./emailTemplates");

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
      from: `"Task Manager Team" <team@taskmanager.com>`,
      to: email,
      subject: subject,
      html: otpEmailTemplates(otp),
    });
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

module.exports = { mailSender };