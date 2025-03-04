import nodemailer from "nodemailer";
import { prisma } from "./prisma";
import { CustomError } from "./Error";

export const mailSender = async (email: string, otp: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: `${email}`,
      subject: `Your OTP for Hostel Management System`,
      html: `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>OTP Verification</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }
                        .container {
                            max-width: 500px;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
                        .otp-code {
                            font-size: 24px;
                            font-weight: bold;
                            color: #333;
                            background-color: #f8f9fa;
                            padding: 10px;
                            display: inline-block;
                            border-radius: 5px;
                            margin: 20px 0;
                        }
                        .footer {
                            font-size: 12px;
                            color: #777;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Hostel Management System</h2>
                        <p>Hello,</p>
                        <p>Your One-Time Password (OTP) for verification is:</p>
                        <div class="otp-code">${otp}</div>
                        <p>This OTP is valid for 5 minutes. Do not share this code with anyone.</p>
                        <p>If you didn't request this, please ignore this email.</p>
                        <p class="footer">© 2025 Hostel Management System</p>
                    </div>
                </body>
                </html>
            `,
    });

    return info;
  } catch (error) {
    throw new CustomError("Fail to send mail", false, 403);
  }
};
