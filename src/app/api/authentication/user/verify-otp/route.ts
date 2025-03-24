import { NextResponse } from "next/server";
import { runQuery } from "../../../db"; // Ensure correct path

export async function POST(req: Request) {
  try {
    const { otp, email } = await req.json();

    if (!otp || !email) {
      return NextResponse.json({ message: "OTP and email are required" }, { status: 400 });
    }

    // Fetch OTP from the database
    const userOtp: any = await runQuery(
      "SELECT otp FROM users WHERE email = ? AND otp_expiry > NOW()",
      [email]
    );

    if (userOtp.length === 0 || userOtp[0].otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // OTP is correct, clear it from the database
    await runQuery("UPDATE users SET otp = NULL WHERE email = ?", [email]);

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
