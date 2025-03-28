import { NextRequest, NextResponse } from 'next/server';
import { connectionToDatabase } from '../db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
    try {
        const jobId = request.headers.get("Job-Id");

        if (!jobId) {
            return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
        }

        const db = await connectionToDatabase();

        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM `job_app` WHERE id = ?",
            [jobId]
        );

        if (rows.length == 0) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        const event = rows[0];

        return NextResponse.json(event, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
