// middleware/email.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "s3632430@gmail.com",
    pass: "audi wohh xhod ymxh", 
  },
});

export const sendOTPEmail = async (to, name, otp) => {
  const mailOptions = {
    from: '"MNNITClub Hub" <s3632430@gmail.com>',
    to,
    subject: "Verify Your Email - MNNITClub Hub",
    html: `
      <h2>Hello ${name},</h2>
      <p>Your OTP for email verification is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
