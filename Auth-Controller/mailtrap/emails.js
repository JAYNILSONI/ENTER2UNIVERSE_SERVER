import nodemailer from "nodemailer";
import dotenv from "dotenv";

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS, // Your Gmail app password
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: `"ENTER2UNIVERSE" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ),
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: `"ENTER2UNIVERSE" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Welcome to ENTER2UNIVERSE",
    html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const mailOptions = {
    from: `"ENTER2UNIVERSE" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    category: "Password Reset",
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    from: `"ENTER2UNIVERSE" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Password Reset",
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
