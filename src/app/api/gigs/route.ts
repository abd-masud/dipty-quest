import path from 'path';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { connectionToDatabase } from '../db';
import { ResultSetHeader } from 'mysql2';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
    const data = await request.formData();

    const formDataString = data.get('data');
    if (!formDataString || typeof formDataString !== 'string') {
        return NextResponse.json({ success: false, message: "Invalid or missing 'data' field" });
    }

    const formFields = JSON.parse(formDataString);
    const { title, content, price } = formFields;

    if (!title || !content || !price) {
        return NextResponse.json({ success: false, message: "Missing required fields" });
    }

    const poster = data.get('poster') as File;
    if (!poster) {
        return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const posterBytes = await poster.arrayBuffer();
    const posterBuffer = Buffer.from(posterBytes);
    const posterFile = poster.name;

    try {
        await writeFile(path.join(process.cwd(), 'public/upload', posterFile), posterBuffer);
        const posterPost = `/upload/${posterFile}`;

        const db = await connectionToDatabase();
        const [result] = await db.query<ResultSetHeader>(
            `INSERT INTO gigs (poster, title, content, price) VALUES (?, ?, ?, ?)`,
            [posterPost, title, content, price]
        );

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'Gigs created successfully' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Failed to insert gigs');
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to create gigs' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function GET() {
    try {
        const db = await connectionToDatabase();

        const [rows] = await db.query('SELECT * FROM `gigs`');

        if (Array.isArray(rows) && rows.length > 0) {
            return new Response(JSON.stringify(rows), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No gigs found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch gigs' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(
                JSON.stringify({ error: "User ID is required" }),
                { status: 400 }
            );
        }

        const db = await connectionToDatabase();

        const [result] = await db.execute<ResultSetHeader>(
            "DELETE FROM gigs WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: "No gig found with the specified ID" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "gig deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during gig deletion:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete gig" }),
            { status: 500 }
        );
    }
}

