import path from 'path';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { connectionToDatabase } from '../db';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request) {
    const data = await request.formData();

    const formDataString = data.get('data');
    if (!formDataString || typeof formDataString !== 'string') {
        return NextResponse.json({ success: false, message: "Invalid or missing 'data' field" });
    }

    const formFields = JSON.parse(formDataString);

    const { title, content } = formFields;

    if (!title || !content) {
        return NextResponse.json({ success: false, message: "Missing required fields" });
    }

    const icon = data.get('icon');
    const file = data.get('file');

    if (!icon || !file) {
        return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const iconBytes = await icon.arrayBuffer();
    const iconBuffer = Buffer.from(iconBytes);
    const iconFile = icon.name;

    const fileBytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileFile = file.name;

    try {
        await writeFile(path.join(process.cwd(), 'public/upload', iconFile), iconBuffer);
        const iconPost = `/upload/${iconFile}`;

        await writeFile(path.join(process.cwd(), 'public/upload', fileFile), fileBuffer);
        const filePost = `/upload/${fileFile}`;

        const db = await connectionToDatabase();
        const [result] = await db.query < ResultSetHeader > (
            `INSERT INTO categories (icon, title, content, file)
            VALUES (?, ?, ?, ?)`,
            [iconPost, title, content, filePost]
        );

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'Categories created successfully' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Failed to insert categories');
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to create categories' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function GET() {
    try {
        const db = await connectionToDatabase();

        const [rows] = await db.query('SELECT * FROM `categories`');

        if (Array.isArray(rows) && rows.length > 0) {
            return new Response(JSON.stringify(rows), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No categories found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
