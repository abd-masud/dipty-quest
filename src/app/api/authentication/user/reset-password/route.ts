import { NextResponse } from "next/server";
import { runQuery } from "../../../db";
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { newPassword, email } = await req.json();

        if (!newPassword || !email) {
            return NextResponse.json({ message: "Password fields and email are required" }, { status: 400 });
        }

        const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        const emailResults = await runQuery(checkEmailQuery, [email]);

        if ((emailResults as any[]).length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const hashedPassword = await hash(newPassword, 10);

        const updatePasswordQuery = "UPDATE users SET password = ? WHERE email = ?";
        await runQuery(updatePasswordQuery, [hashedPassword, email]);

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
    }
}
