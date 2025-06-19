/* eslint-disable no-unused-vars */
import { Verification_Email_Template, Welcome_Email_Template } from "../libs/emailTemplate.js";
import { transporter } from "./EmailConfig.js"

export const sendVerificationCode = async (email, verificationCode) => {
    try {
      const response = await transporter.sendMail({
        from: '"MNNITClub Hub" <s3632430@gmail.com>',
        to: email,
        subject: "Verify Your Email",
        html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
      });
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };
  

  export const WelcomeEmail = async (email, name) => {
    try {
      const response = await transporter.sendMail({
        from: '"MNNITClub Hub" <s3632430@gmail.com>',
        to: email,
        subject: "Welcome to MNNITClub Hub 🎉",
        html: Welcome_Email_Template.replace("{name}", name),
      });
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
  };
  