import { NextRequest, NextResponse } from 'next/server';
import { connectionToDatabase } from '../db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
    try {
        const categoryId = request.headers.get("Category-Id");

        if (!categoryId) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
        }

        const db = await connectionToDatabase();

        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM `categories` WHERE id = ?",
            [categoryId]
        );

        if (rows.length == 0) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const category = rows[0];

        return NextResponse.json(category, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
