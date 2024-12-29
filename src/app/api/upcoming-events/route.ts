import { NextRequest, NextResponse } from 'next/server';
import { connectionToDatabase } from '../db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
    try {
        const eventId = request.headers.get("Event-Id");

        if (!eventId) {
            return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
        }

        const db = await connectionToDatabase();

        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM `events` WHERE id = ?",
            [eventId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        const event = rows[0];

        return NextResponse.json(event, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
