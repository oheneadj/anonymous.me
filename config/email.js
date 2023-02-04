const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const sendEmail = (receiver, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: receiver,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      return "false";
    } else {
      return "true";
    }
  });
};

module.exports = sendEmail;
