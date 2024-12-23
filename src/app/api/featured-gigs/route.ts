import { NextRequest, NextResponse } from 'next/server';
import { connectionToDatabase } from '../db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
    try {
        const gigId = request.headers.get("Gig-Id");

        if (!gigId) {
            return NextResponse.json({ error: "Gig ID is required" }, { status: 400 });
        }

        const db = await connectionToDatabase();

        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM `gigs` WHERE id = ?",
            [gigId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "Gig not found" }, { status: 404 });
        }

        const gig = rows[0];

        return NextResponse.json(gig, { status: 200 });
    } catch (error) {
        console.error("Error fetching gig:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
