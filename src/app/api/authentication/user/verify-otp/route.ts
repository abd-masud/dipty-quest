import { NextResponse } from "next/server";
import { connectionToDatabase } from "../../../db";
import crypto from "crypto";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const { otp, email } = await req.json();

    console.log(otp, email);

    if (!otp || !email) {
      return NextResponse.json({ message: "OTP and email are required" }, { status: 400 });
    }

    const db = await connectionToDatabase();
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT otp FROM users WHERE email = ? AND otp_expires_at > NOW()",
      [email]
    );

    if (!Array.isArray(rows) || rows.length == 0) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    const storedOtpHash = rows[0].otp as string;
    const inputOtpHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (storedOtpHash !== inputOtpHash) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    await db.query("UPDATE users SET otp = NULL, otp_expires_at = NULL WHERE email = ?", [email]);

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
