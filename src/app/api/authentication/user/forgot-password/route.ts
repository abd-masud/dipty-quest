import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "../../../db";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const db = await connectionToDatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 1 * 60 * 1000);
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    await db.query("UPDATE users SET otp = ?, otp_expires_at = ? WHERE email = ?", [
      otpHash,
      otpExpiresAt,
      email,
    ]);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Email User:", process.env.EMAIL_USER);
    console.log("Email Pass:", process.env.EMAIL_PASS ? "Exists" : "Not Found");


    await transporter.sendMail({
      from: `DiptyQuest <2023200010068@seu.edu.bd>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP Code is ${otp}. It is valid for 1 minutes.`,
    });

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ message: "Error sending OTP. Please try again." }, { status: 500 });
  }
}
