import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2/promise';
import { compare } from 'bcryptjs';
import { connectionToDatabase } from '../../../db';

interface UserRow extends RowDataPacket {
    id: number;
    name: string;
    role: string;
    company: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
    }

    try {
        const db = await connectionToDatabase();
        const [rows] = await db.query<UserRow[]>('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const { password: userPassword, ...userData } = rows[0];

        const isPasswordValid = await compare(password, userPassword);
        if (isPasswordValid) {
            return NextResponse.json({ message: 'Login successful', user: userData }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
