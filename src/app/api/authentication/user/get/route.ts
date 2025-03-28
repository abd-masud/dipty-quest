import { connectionToDatabase } from '../../../db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const userId = new URL(request.url).searchParams.get('id');

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const db = await connectionToDatabase();

        const query = "SELECT * FROM users WHERE id = ?";
        const params = [userId];

        const [rows] = await db.query(query, params);

        if (Array.isArray(rows) && rows.length == 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

