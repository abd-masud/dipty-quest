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

    const { category_id, category_name, name, last_name, email, phone } = formFields;

    if (!name || !last_name || !email || !phone) {
        return NextResponse.json({ success: false, message: "Missing required fields" });
    }

    const file = data.get('file') as File || null;

    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const fileBytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileFile = file.name;

    try {
        await writeFile(path.join(process.cwd(), 'public/file', fileFile), fileBuffer);
        const filePost = `/file/${fileFile}`;

        const db = await connectionToDatabase();
        const [result] = await db.query<ResultSetHeader>(
            `INSERT INTO shared_plans (category_id, category_name, name, last_name, email, phone, file)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [category_id, category_name, name, last_name, email, phone, filePost]
        );

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'User registered successfully' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Failed to insert user');
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to register user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function GET() {
    try {
        const db = await connectionToDatabase();

        const [rows] = await db.query('SELECT * FROM `shared_plans`');

        if (Array.isArray(rows) && rows.length > 0) {
            return new Response(JSON.stringify(rows), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No entries found in event form' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch event forms' }), {
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
            "DELETE FROM shared_plans WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: "No plan found with the specified ID" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "plan deleted successfully" }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: "Failed to delete plan" }),
            { status: 500 }
        );
    }
}

